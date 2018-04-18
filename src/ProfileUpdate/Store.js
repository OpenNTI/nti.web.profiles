import {Stores} from '@nti/lib-store';

import {getFields} from './utils';

export default class ProfileUpdateStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('entity', null);
		this.set('schema', null);
		this.set('errors', null);
		this.set('fields', null);
		this.set('error', null);
		this.set('loading', false);
	}


	async setEntity (entity) {
		this.set('loading', true);
		this.emitChange('loading');

		try {
			const profile = await entity.fetchLink('account.profile');
			const {ProfileSchema:schema, ValidationErrors:errors} = profile;

			this.set('loading', false);
			this.set('schema', schema);
			this.set('errors', errors);
			this.set('fields', getFields(schema, errors));
			this.emitChange('fields', 'schema', 'errors', 'loading');
		} catch (e) {
			this.set('error', e);
			this.emitChange('error');
		}
	}
}
