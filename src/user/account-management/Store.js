import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';
import { ImageEditor } from '@nti/web-whiteboard';

export default class AccountStore extends Stores.SimpleStore {
	static Singleton = true;

	constructor() {
		super();
		this.load();
	}

	async saveImage(image) {
		this.set('loading', true);
		try {
			const user = this.get('user');

			await user.refresh();
			await user.save({ avatarURL: image.src });

			this.set('image', image);

			this.set('loading', false);
		} catch (e) {
			this.set('error', e);
		}
	}

	async load() {
		this.set('initLoading', true);

		try {
			const service = await getService();
			const user = await service.getAppUser();
			const image = await ImageEditor.getImg(user.avatarURL);

			this.set('user', user);
			this.set('image', image);

			this.set('initLoading', false);
		} catch (error) {
			this.set('error', error);

			this.set('initLoading', false);
		}
	}
}
