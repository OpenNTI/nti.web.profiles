import {Stores} from '@nti/lib-store';
import Logger from '@nti/util-logger';

const logger = Logger.get('profile-update');

import {getFieldGroup, mergeFieldGroups, shouldKeepValue, updateFieldGroups} from './utils';

export default class ProfileUpdateStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('entity', null);
		this.set('schema', null);
		this.set('type', null);
		this.set('errors', null);
		this.set('fieldGroups', null);
		this.set('error', null);
		this.set('loading', false);
		this.set('values', {});
		this.set('isValid', false);
	}

	get fields () {
		const groups = this.get('fieldGroups');

		if (!groups) { return groups; }

		return groups.reduce((acc, group) => {
			return acc.concat(group);
		}, []);
	}


	getValueFor (name) {
		const values = this.get('values');
		const value = values[name];

		return value && value.serialize ? value.serialize() : value;
	}


	setFieldGroups (groups) {
		const values = this.get('values');
		const newValues = {};

		for (let group of groups) {
			for (let field of group) {
				const {name} = field.schema;
				const value = values[name];

				if (shouldKeepValue(value, field)) {
					newValues[name] = value;
				}
			}
		}

		this.set('values', newValues);
		this.set('fieldGroups', groups);
		this.emitChange('values', 'fieldGroups');
	}


	async setEntity (entity) {
		this.set('entity', entity);
		this.set('loading', true);
		this.emitChange('loading', 'entity');

		try {
			const profile = await entity.fetchLink('account.profile');
			const {
				ProfileSchema: schema,
				ProfileType: type,
				OriginalProfileType: baseType,
				ValidationErrors: errors
			} = profile;

			this.set('loading', false);
			this.set('schema', schema);
			this.set('errors', errors);
			this.set('type', type);
			this.set('baseType', baseType);
			this.setFieldGroups(getFieldGroup(schema, errors, type, baseType));
			this.emitChange('fields', 'fieldGroups', 'schema', 'errors', 'loading');
		} catch (e) {
			this.set('error', e);
			this.emitChange('error');
		}
	}

	onFieldChange (field, value) {
		const baseType = this.get('baseType');
		const {name} = field.schema;
		let values = {...this.get('values'), [name]: value};

		//TODO: figure out how not to need this.
		//for OSDE the parent role and the employer/community member role both need to fill
		//out location, but we don't want to leave it filled in when they switch...
		if (name === 'role' && baseType === 'IOSDEUserProfile') {
			values = {role: value};
		}

		this.set('error', null);
		this.set('values', values);
		this.emitChange('values');

		this.validateAfterFieldChange(field);
	}

	getDataToSend () {
		const groups = this.get('fieldGroups');
		const dataToSend = {};

		for (let group of groups) {
			for (let f of group) {
				const {name} = f.schema;

				dataToSend[name] = this.getValueFor(name);
			}
		}

		return dataToSend;
	}


	async validateAfterFieldChange (field) {
		const oldType = this.get('type');
		const entity = this.get('entity');
		const groups = this.get('fieldGroups');
		const dataToSend = this.getDataToSend();

		try {
			const {ProfileSchema: newSchema, ProfileType: type, OriginalProfileType: baseType} = await entity.putToLink('account.profile.preflight', dataToSend);

			this.set('isValid', true);
			this.set('schema', newSchema);
			this.set('type', type);
			this.set('baseType', baseType);
			this.setFieldGroups(mergeFieldGroups(...getFieldGroup(newSchema, [], type, baseType), ...updateFieldGroups(newSchema, groups, type, oldType)));
			this.emitChange('isValid');
		}
		catch (e) {
			const {
				ValidationErrors,
				ProfileSchema: newSchema,
				ProfileType: type,
				OriginalProfileType: baseType
			} = e;

			if (!newSchema) {
				logger.error(e);
				this.set('error', 'Encountered an unanticipated error.');
				this.emitChange('error');
				return;
			}

			if (field.schema.name === 'role' && dataToSend.role === 'Employer/Community Member') {
				ValidationErrors.push({
					field: 'positions'
				});
			}

			this.set('isValid', false);
			this.set('schema', newSchema);
			this.set('type', type);
			this.set('baseType', baseType);
			this.setFieldGroups(
				mergeFieldGroups(
					...getFieldGroup(newSchema, ValidationErrors, type, baseType),
					...updateFieldGroups(newSchema, groups, type, oldType)
				)
			);
			this.emitChange('isValid', 'fields');
		}
	}


	async saveValues () {
		const entity = this.get('entity');
		const dataToSend = this.getDataToSend();

		this.set('saving', true);
		this.emitChange('saving');

		try {
			await entity.save(dataToSend);

			this.set('saving', false);
			this.emitChange('saving');
		} catch (e) {
			this.set('isValid', false);
			this.set('saving', false);
			this.set('error', e);
			this.emitChange('error', 'saving');

			throw e;
		}
	}
}
