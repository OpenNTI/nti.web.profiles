import { Stores } from '@nti/lib-store';
import { getAppUser, getService } from '@nti/web-client';
import { ImageEditor } from '@nti/web-whiteboard';

export default class AccountStore extends Stores.SimpleStore {
	static Singleton = true;

	constructor() {
		super();
		this.load();
	}

	async handlePassword({ formData, json }) {
		this.set('loading', true);

		try {
			if (json?.old === json?.new) {
				const e = new Error('Old and new passwords must be different');
				e.field = 'old';

				throw e;
			}

			if (json?.new !== json?.verify) {
				const e = new Error('Passwords do not match.');
				e.field = 'verify';

				throw e;
			}

			formData?.delete?.('verify');

			const user = await getAppUser();
			await user.changPassword(json.new, json.old);

			this.set('passwordChanged', true);
		} catch (e) {
			this.set('loading', false);
			this.set('error', e);
		}
	}

	async saveImage(image) {
		this.set('loading', true);
		try {
			const service = await getService();
			const user = await service.getAppUser();

			await user.refresh();
			await user.save({ avatarURL: image.src });

			this.set('image', image);

			this.set('loading', false);
		} catch (e) {
			this.set('error', e);
		}
	}

	async load() {
		this.set('loading', true);

		try {
			const service = await getService();
			const user = await service.getAppUser();
			const image = await ImageEditor.getImg(user.avatarURL);

			this.set('user', user);
			this.set('image', image);
			this.set('passwordChanged', false);

			this.set('loading', false);
		} catch (error) {
			this.set('error', error);

			this.set('loading', false);
		}
	}
}
