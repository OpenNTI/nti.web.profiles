import {diff} from 'deep-object-diff';
import {Stores} from '@nti/lib-store';
import {Promises} from '@nti/lib-commons';

import {ensureArray as arr, slugify} from '../../util';

import {FieldConfig} from './config';
import {addGroupsToSchema, getGroupedSchemaFields} from './util';

const PREFIX = 'nti-profile-edit-store';
const px = x => `${PREFIX}:${x}`;

export const LOADING = px('loading');
export const LOADED = px('loaded');
export const CLEAR_ERRORS = px('clear-errors');
export const ERROR = px('error');
export const FIELD_ERRORS = px('field-errors');
export const FORM_ID = px('form-id');
export const HAS_UNSAVED_CHANGES = px('has-unsaved');
export const SET_FIELD_ERROR = px('set-error');
export const FIELD_GROUPS = px('field-groups');
export const SCHEMA_CHANGES = px('schema-changes');
export const SET_FIELD_VALUE = px('set-field-value');
export const SAVE_PROFILE = px('save-profile');

const GET_GROUPS = Symbol(px('get field groups'));
const GET_ENTITY_VALUE = Symbol(px('get entity value'));
const GET_PAYLOAD = Symbol(px('get payload'));
const PREFLIGHT = Symbol(px('preflight'));
const QUEUED_PREFLIGHT = Symbol(px('queued-preflight'));
const INITIAL_SCHEMA = Symbol('initial-schema');
const PREFLIGHT_AND_SAVE = Symbol(px('preflight and save'));
const PREPROCESS_SCHEMA = Symbol('preprocess-schema');
const SCHEMA = Symbol(px('schema'));
const SET_SCHEMA = Symbol(px('set schema'));
const DATA_MARKER = Symbol('data marker');
const DATA = Symbol('data');

export class Store extends Stores.SimpleStore {
	static Singleton = true

	constructor () {
		super();
		this.setMaxListeners(100);

		// locate the data in the superclass
		this.set(DATA_MARKER, true);
		const dataKey = Object.getOwnPropertySymbols(this).find(symbol => (this[symbol] || {})[DATA_MARKER]);
		delete this[dataKey][DATA_MARKER];

		Object.defineProperty(this, DATA, {
			get: () => this[dataKey]
		});
	}

	get (key) {
		// fall back to entity's value if we don't have it.
		const value = super.get(key);
		return value !== undefined // explicit check to allow empty strings (falsy) through
			? value
			: this[GET_ENTITY_VALUE](key);
	}

	[GET_ENTITY_VALUE] = key => {
		const {entity} = this;
		const value = (entity || {})[key];
		return Array.isArray(value)
			? [...value] // don't modify the array on the user
			: value;
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
				result = await (typeof work === 'function' ? work() : work);
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

	[SET_FIELD_VALUE] = (name, value) => {
		this.set({
			[name]: value,
			[HAS_UNSAVED_CHANGES]: true
		});

		const queued = this[QUEUED_PREFLIGHT];
		if(queued && queued.abort) {
			queued.abort();
		}

		this[QUEUED_PREFLIGHT] = Promises.buffer(300, async () => {
			try {
				const result = await this[PREFLIGHT]();
				return result;
			}
			catch (e) {
				//
			}
			finally {
				delete this[QUEUED_PREFLIGHT];
			}
		});
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

	[GET_PAYLOAD] () {
		const inSchema = ([key]) => this[SCHEMA].hasOwnProperty(key);
		const reassemble = (acc, [key, value]) => ({...acc, [key]: value});
		return Object.entries(this[DATA])
			.filter(inSchema)
			.reduce(reassemble, {});
	}

	[PREFLIGHT] = async (payload = this[GET_PAYLOAD]()) => {
		try {
			return await this.entity.preflightProfile(payload);
		}
		catch (e) {
			if (e.ProfileSchema) {
				this[SET_SCHEMA](arr(e.ProfileSchema)[0]);
			}
			throw e;
		}
	}

	[SAVE_PROFILE] = async () => {
		return this.busy(this[PREFLIGHT_AND_SAVE]);
	}

	[PREFLIGHT_AND_SAVE] = async () => {
		const {entity} = this;
		const payload = this[GET_PAYLOAD]();

		if (Object.keys(payload || {}).length === 0) {
			return;
		}

		await this[PREFLIGHT](payload);

		const result = await entity.save(payload);

		const groups = this.get(FIELD_GROUPS); // restore field groups after clear
		this.clear();
		this.set(FIELD_GROUPS, groups);

		return result;
	}

	[CLEAR_ERRORS] = () => {
		this.set({
			[ERROR]: undefined,
			[FIELD_ERRORS]: undefined
		});
	}

	[GET_GROUPS] = () => getGroupedSchemaFields(this[SCHEMA], FieldConfig.fields);


	[PREPROCESS_SCHEMA] = schema => {
		return addGroupsToSchema(schema, FieldConfig.fieldGroups);
	}

	[SET_SCHEMA] = schema => {
		const initial = this[INITIAL_SCHEMA];
		const processed = this[PREPROCESS_SCHEMA](schema);

		this[INITIAL_SCHEMA] = initial || processed;
		this[SCHEMA] = processed;

		this.set(FIELD_GROUPS, this[GET_GROUPS]());
	};

	[SCHEMA_CHANGES] = () => {
		const {[INITIAL_SCHEMA]: initial, [SCHEMA]: current} = this;

		return diff(initial, current);
	}

	load = async (entity, force) => {
		if (this.entity === entity && (this.get(LOADED) || this.get(LOADING)) && !force) {
			return;
		}

		if(entity && (!this.entity || this.entity.getID() !== entity.getID())) {
			this.entity = entity;
		}

		this.clear();

		const formId = entity && entity.getID ? slugify(entity.getID()) : 'unknown-id';
		this.set(FORM_ID, formId);

		if (entity && entity.getProfileSchema) {
			// thenning because we want this[SCHEMA] set before this.busy resets 'loading'
			this.busy(entity.getProfileSchema()
				.then(this[SET_SCHEMA])
				.catch(() => this[SCHEMA] = null));
		}
		else {
			this[SCHEMA] = null;
		}
	}
}
