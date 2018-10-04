import {Stores} from '@nti/lib-store';

import {ensureArray as arr} from '../../util';

const PREFIX = 'nti-profile-edit-store';
const px = x => `${PREFIX}:${x}`;

export const LOADING = px('loading');
export const LOADED = px('loaded');
export const CLEAR_ERRORS = px('clear-errors');
export const ERROR = px('error');
export const FIELD_ERRORS = px('field-errors');
export const SET_FIELD_ERROR = px('set-error');
export const GET_SCHEMA_ENTRY = px('get-schema-entry');
export const SET_FIELD_VALUE = px('set-field-value');
export const SAVE_PROFILE = px('save-profile');

const SCHEMA = Symbol(px('schema'));
const DATA_MARKER = Symbol('data marker');
const DATA = Symbol('data');

export class Store extends Stores.BoundStore {

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
		const entity = this.binding;
		return this.busy(entity.save(payload));
	}

	[CLEAR_ERRORS] = () => {
		this.set({
			[ERROR]: undefined,
			[FIELD_ERRORS]: undefined
		});
	}

	get (key) {
		const {binding} = this;

		// fall back to entity's value if we don't have it.
		const value = super.get(key);
		return value != null // explicit check to allow empty strings (falsy) through
			? value
			: (binding || {})[key];
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

	load = async () => {
		const {binding: entity} = this;

		this.clear();

		if (entity && entity.getProfileSchema) {
			// thenning because we want this[SCHEMA] set before this.busy resets 'loading'
			this.busy(entity.getProfileSchema()
				.then(schema => this[SCHEMA] = schema)
				.catch(() => this[SCHEMA] = null));
		}
		else {
			this.set([SCHEMA]: null);
		}
	}
}
