import {Stores} from '@nti/lib-store';

export const LOADING = 'nti-profile-edit-store:loading';
export const LOADED = 'nti-profile-edit-store:loaded';
export const ERROR = 'nti-profile-edit-store:error';
export const GET_SCHEMA_ENTRY = 'nti-profile-edit-store:get-schema-entry';
export const SET_FIELD_VALUE = 'nti-profile-edit-store:set-field-value';
export const SAVE_PROFILE = 'nti-profile-edit-store:save-profile';

const SCHEMA = Symbol('nti-profile-edit-store:schema');

export class Store extends Stores.BoundStore {

	constructor () {
		super();
		this[LOADING] = true;
		this.setMaxListeners(100);
	}

	[GET_SCHEMA_ENTRY] = (key) => {
		return (this[SCHEMA] || {})[key];
	}

	[SET_FIELD_VALUE] = (name, value) => {
		this.set(name, value);
	}

	[SAVE_PROFILE] = async () => {
		const entity = this.binding;
		return entity.save({});
	}

	get (key) {
		const {binding} = this;
		return super.get(key) || (binding || {})[key];
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
				[LOADED]: true,
				[LOADING]: false,
				[ERROR]: error
			});

			resolve(result);
		});
	}

	load = async () => {
		const {binding: entity} = this;

		this.clear();

		if (entity && entity.getProfileSchema) {
			// thenning because we want this[SCHEMA] set before this.busy resets 'loading'
			this.busy(entity.getProfileSchema().then(schema => this[SCHEMA] = schema));
		}
		else {
			this.set(ERROR, new Error('Profile Schema Unavailable'));
		}
	}
}
