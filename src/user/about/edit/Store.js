import React from 'react';
import {Stores} from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {

	static connect (...args) {
		// handles deriveStoreKeyFromProps for connecting components
		return (Component) => {
			return super.connect(...args)(storeKey(Component));
		};
	}

	set (name, value) {
		return super.setImmediate(name, value);
	}

	clear () {
		super.clear(true);
	}

	load = async () => {
		this.clear();
	}
}

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
