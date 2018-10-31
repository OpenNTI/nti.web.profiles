import {diff} from 'deep-object-diff';
import {Stores} from '@nti/lib-store';
import {buffer} from '@nti/lib-commons';

import {ensureArray as arr, slugify} from '../../util';

import {FieldConfig} from './config';
import {addGroupsToSchema, getGroupedSchemaFields, trimValue} from './util';

const PREFIX = 'nti-profile-edit-store';
const px = x => `${PREFIX}:${x}`;

export const LOADING = px('loading');
export const LOADED = px('loaded');
export const CAN_EDIT = px('can-edit');
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

const DATA_MARKER = Symbol('data marker');
const DATA = Symbol('data');

export class Store extends Stores.SimpleStore {
	static Singleton = true

	/**
	 * The schema we're currently operating with; used to render the form, validate, etc.
	 * Preflight may change this value
	 * @type {Object}
	 */
	#schema

	/**
	 * The user's original profile schema. We diff this against the 'current' schema to identify changes
	 * @type {Object}
	 */
	#initialSchema

	/**
	 * Preflight returns a profile type with the schema. We keep track of the most recent
	 * value and use it when deciding whether we need to update the schema, which may trigger
	 * a UI refresh
	 * @type {string}
	 */
	#profileType

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
			: this.#getEntityValue(key);
	}

	#getEntityValue = key => {
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

	clearEdits () {
		if (!this[DATA] || !this.#schema) {
			return;
		}

		const inSchema = key => this.#schema.hasOwnProperty(key);
		Object.keys(this[DATA])
			.filter(inSchema)
			.forEach(k => delete this[DATA][k]);
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

		try {
			return this.#preflight();
		}
		catch (e) {
			//
		}
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

	#getPayload = () => {
		const inSchema = ([key]) => this.#schema.hasOwnProperty(key);
		const reassemble = (acc, [key, value]) => ({...acc, [key]: trimValue(value)});
		return Object.entries(this[DATA])
			.filter(inSchema)
			.reduce(reassemble, {});
	}

	#preflight = buffer(500, async (payload = this.#getPayload()) => {
		const result = await this.entity.preflightProfile(payload).then(r => r, r => r);

		const {
			ProfileType: newType,
			OriginalProfileType: oldType,
			ProfileSchema: schema,
			// ValidationErrors: errors,
			statusCode
		} = result;

		const profileType = this.#profileType;

		if ((newType !== oldType) || (profileType && newType !== profileType)) {
			this.#profileType = newType;
			this.#setSchema(schema);
		}

		if (statusCode > 399) {
			throw result;
		}

		return result;
	});

	[SAVE_PROFILE] = async () => {
		return this.busy(this.#preflightAndSave);
	}

	#preflightAndSave = async () => {
		const {entity} = this;
		const payload = this.#getPayload();

		if (Object.keys(payload || {}).length === 0) {
			return;
		}

		await this.#preflight(payload);

		const result = await entity.save(payload);

		this.clearEdits();
		this[CLEAR_ERRORS]();

		// flush schema differences after successful save
		this.#initialSchema = this.#schema;

		return result;
	}

	[CLEAR_ERRORS] = () => {
		this.set({
			[ERROR]: undefined,
			[FIELD_ERRORS]: undefined
		});
	}

	#preprocessSchema = schema => {
		return addGroupsToSchema(schema, FieldConfig.fieldGroups);
	}

	#setSchema = schema => {
		const initial = this.#initialSchema;
		const processed = this.#preprocessSchema(schema);

		this.#initialSchema = initial || processed;
		this.#schema = processed;

		const canEdit = Object.values(this.#schema).some(v => (v || {}).readonly === false);

		this.set({
			[FIELD_GROUPS]: getGroupedSchemaFields(processed, FieldConfig.fields),
			[CAN_EDIT]: canEdit
		});
	};

	/**
	 * Computes the difference between the initial and current schema, optionally filtering for specific property changes
	 * @param {string[]} properties - The property changes of interest (array or vararg)
	 * @returns {Object} - The portion of the schema that changed, grouped according to field.group
	 */
	// [SCHEMA_CHANGES] = (...properties) => { // would be nice to accept either an array or varargs, but…
	[SCHEMA_CHANGES] = (props) => {
		// const props = properties.flat(); // …ie doesn't support array.flat and we're only invoking this from one place anyway.

		// filter function for the changes
		const interested = props.length === 0
			? x => true // passthrough if no specific properties were specified
			: ([field, changed]) => ( // filter out items whose changes don't include the specified properties
				Object.keys(changed || {})
					.some(prop => props.includes(prop))
			);

		// const {#initialSchema: initial, #schema: current} = this;
		const delta = diff(this.#initialSchema, this.#schema);

		const fields = Object.entries(delta)
			.filter(interested)
			.map(([field]) => field);

		return getGroupedSchemaFields(this.#schema, fields);
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
			// thenning because we want this.#schema set before this.busy resets 'loading'
			this.busy(entity.getProfileSchema()
				.then(this.#setSchema)
				.catch(() => this.#schema = null));
		}
		else {
			this.#schema = null;
		}
	}
}
