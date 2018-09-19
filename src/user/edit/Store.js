import {Stores} from '@nti/lib-store';

const PREFIX = 'nti-profile-edit-store';
const px = x => `${PREFIX}:${x}`;

export const LOADING = px('loading');
export const LOADED = px('loaded');
export const ERROR = px('error');
export const GET_SCHEMA_ENTRY = px('get-schema-entry');
export const SET_FIELD_VALUE = px('set-field-value');
export const SAVE_PROFILE = px('save-profile');

const SCHEMA = Symbol(px('schema'));

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
		const inSchema = ([key]) => this[SCHEMA].hasOwnProperty(key);
		const reassemble = (acc, [key, value]) => ({...acc, [key]: value});
		const payload = Object.entries(this.getAll())
			.filter(inSchema)
			.reduce(reassemble, {});
		const entity = this.binding;
		return this.busy(entity.save(payload));
	}

	get (key) {
		const {binding} = this;

		// fall back to entity's value if we don't have it.
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
