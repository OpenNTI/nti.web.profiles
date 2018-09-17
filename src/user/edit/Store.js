import React from 'react';
import {Stores} from '@nti/lib-store';

const Entity = Symbol('Entity');
export const LOADING = 'loading';
export const ERROR = 'error';
export const SCHEMA = 'schema';

export default class Store extends Stores.SimpleStore {

	static connect (...args) {
		// handle deriveStoreKeyFromProps for connecting components
		return (Component) => {
			return super.connect(...args)(storeKey(Component));
		};
	}

	constructor (props) {
		super(props);
		const {user, entity = user} = props || {};

		if (!entity) {
			throw new Error('Profile editor store requires a User.');
		}

		this[Entity] = entity;
		this.load();
	}

	get entity () {
		return this[Entity];
	}

	set (name, value) {
		// we need immediate feedback during editing
		// because input values are controlled by the store.
		return super.setImmediate(name, value);
	}

	clear () {
		super.clear(true);
	}

	async busy (work) {
		return new Promise(async resolve => {
			let error, result;

			this.set({
				[LOADING]: true,
				[ERROR]: error
			});

			try {
				result = await work;
			}
			catch (e) {
				error = e;
			}

			this.set({
				[LOADING]: false,
				[ERROR]: error
			});

			resolve(result);
		});
	}

	load = async () => {
		const {entity} = this;

		this.clear();

		if (entity && entity.getProfileSchema) {
			this.set(SCHEMA, await this.busy(entity.getProfileSchema()));
		}
	}
}

// handle deriveStoreKeyFromProps implementation for connecting components
function storeKey (Component) {
	return class StoreKeyed extends React.Component {
		static deriveStoreKeyFromProps = ({user, entity}) => (user || entity).getID()

		render () {
			return (
				<Component {...this.props} />
			);
		}
	};
}
