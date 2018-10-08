import {Stores} from '@nti/lib-store';

import {ensureArray as arr, slugify} from '../../util';

const PREFIX = 'nti-profile-edit-store';
const px = x => `${PREFIX}:${x}`;

export const LOADING = px('loading');
export const LOADED = px('loaded');
export const CLEAR_ERRORS = px('clear-errors');
export const ERROR = px('error');
export const FIELD_ERRORS = px('field-errors');
export const FORM_ID = px('form-id');
export const SET_FIELD_ERROR = px('set-error');
export const GET_SCHEMA_ENTRY = px('get-schema-entry');
export const SET_FIELD_VALUE = px('set-field-value');
export const SAVE_PROFILE = px('save-profile');

const SCHEMA = Symbol(px('schema'));
const DATA_MARKER = Symbol('data marker');
const DATA = Symbol('data');

export class Store extends Stores.SimpleStore {
	static Singleton = true

	constructor () {
		super();
		this[LOADING] = true;
		this.setMaxListeners(100);

		// locate the data in the superclass
		this.set(DATA_MARKER, true);
		const dataKey = Object.getOwnPropertySymbols(this).find(symbol => (this[symbol] || {})[DATA_MARKER]);
		delete this[dataKey][DATA_MARKER];

		Object.defineProperty(this, DATA, {
			get: () => this[dataKey]
		});
	}

	[GET_SCHEMA_ENTRY] = (key) => {
		return (this[SCHEMA] || {})[key];
	}

	[SET_FIELD_VALUE] = (name, value) => {
		this.set(name, value);
	}

	[SET_FIELD_ERROR] = (error, where) => {
		const existing = arr(this.get(FIELD_ERRORS) || []);
		const {name} = (error || {});
		const isDuplicate = name && existing.some(({name: n, where: w}) => (n === name && w === where));

		if (!isDuplicate) {
			const errors = [...existing, {error, where}];
			super.set(FIELD_ERRORS, errors); // we don't need immediate updates for validation errors; could be multiple
		}
	}

	[SAVE_PROFILE] = async () => {
		const inSchema = ([key]) => this[SCHEMA].hasOwnProperty(key);
		const reassemble = (acc, [key, value]) => ({...acc, [key]: value});
		const payload = Object.entries(this[DATA])
			.filter(inSchema)
			.reduce(reassemble, {});

		return this.busy(this.entity.save(payload).then(r => {
			this.clear();
			return r;
		}));
	}

	[CLEAR_ERRORS] = () => {
		this.set({
			[ERROR]: undefined,
			[FIELD_ERRORS]: undefined
		});
	}

	get (key) {
		const {entity} = this;

		// fall back to entity's value if we don't have it.
		const value = super.get(key);
		return value !== undefined // explicit check to allow empty strings (falsy) through
			? value
			: (entity || {})[key];
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
		return new Promise(async (resolve, reject) => {
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

			error ? reject(error) : resolve(result);
		});
	}

	load = async (entity) => {
		if(entity && (!this.entity || this.entity.getID() !== entity.getID())) {
			this.entity = entity;
		}

		this.clear();

		const formId = entity && entity.getID ? slugify(entity.getID()) : 'unknown-id';
		this.set(FORM_ID, formId);

		if (entity && entity.getProfileSchema) {
			// thenning because we want this[SCHEMA] set before this.busy resets 'loading'
			this.busy(entity.getProfileSchema()
				.then(schema => this[SCHEMA] = schema)
				.catch(() => this[SCHEMA] = null));
		}
		else {
			this[SCHEMA] = null;
		}
	}
}
