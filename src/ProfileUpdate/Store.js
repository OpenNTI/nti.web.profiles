import {Stores} from '@nti/lib-store';

import {getFieldGroup, mergeFieldGroups} from './utils';

export default class ProfileUpdateStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('entity', null);
		this.set('schema', null);
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


	async setEntity (entity) {
		this.set('entity', entity);
		this.set('loading', true);
		this.emitChange('loading', 'entity');

		try {
			const profile = await entity.fetchLink('account.profile');
			const {ProfileSchema:schema, ValidationErrors:errors} = profile;

			this.set('loading', false);
			this.set('schema', schema);
			this.set('errors', errors);
			this.set('fieldGroups', getFieldGroup(schema, errors));
			this.emitChange('fields', 'fieldGroups', 'schema', 'errors', 'loading');
		} catch (e) {
			this.set('error', e);
			this.emitChange('error');
		}
	}

	onFieldChange (field, value) {
		const {name} = field.schema;
		const values = {...this.get('values'), [name]: value};

		this.set('error', null);
		this.set('values', values);
		this.emitChange('values');

		this.validateAfterFieldChange(field);
	}


	async validateAfterFieldChange (field) {
		const entity = this.get('entity');
		const groups = this.get('fieldGroups');
		const values = this.get('values');
		const schema = this.get('schema');
		const groupsToSend = [];
		const dataToSend = {};

		for (let group of groups) {
			let hasField = false;

			for (let f of group) {
				if (f === field) {
					hasField = true;
				}

				const {name} = f.schema;

				dataToSend[name] = values[name];
			}

			groupsToSend.push(group);
			if (hasField) { break; }
		}

		try {
			await entity.putToLink('account.profile.preflight', dataToSend);

			this.set('isValid', true);
			this.emitChange('isValid');
		} catch (e) {
			const {ValidationErrors} = e;

			if (field.schema.name === 'role' && dataToSend.role === 'Employer/Community Member') {
				ValidationErrors.push({
					field: 'positions'
				});
			}

			this.set('isValid', false);
			this.set('fieldGroups', mergeFieldGroups(...groupsToSend, ...getFieldGroup(schema, ValidationErrors)));
			this.emitChange('isValid', 'fieldGroups', 'field');
		}
	}


	async saveValues () {
		const entity = this.get('entity');
		const groups = this.get('fieldGroups');
		const values = this.get('values');

		const dataToSend = {};

		for (let group of groups) {
			for (let field of group) {
				const {name} = field.schema;

				dataToSend[name] = values[name];
			}
		}

		this.set('saving', true);
		this.emitChange('saving');

		try {
			await entity.save(dataToSend);

			this.set('saving', false);
			this.emitChange('saving');
		} catch (e) {
			this.set('saving', false);
			this.set('error', e);
			this.emitChange('error', 'saving');

			throw e;
		}
	}
}
