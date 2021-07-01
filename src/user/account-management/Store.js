import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

export default class AccountStore extends Stores.SimpleStore {
	static Singleton = true;

	constructor () {
		super();
	}

	async load() {
		this.set('loading', true);

		try {
			const service = await getService();
			const user = await service.getAppUser();

			this.set(user);

			this.set('loading', false);
		} catch (error) {
			this.set('error', error);

			this.set('loading', false);
		}
	}
}
