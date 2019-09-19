import {Stores} from '@nti/lib-store';
import {Array as arr} from '@nti/lib-commons';

const initialState = {
	loading: true,
	displayName: null,
	about: null,
	channels: null,
	channelOrders: null,
	deleting: false
};

export default class CommunityEditStore extends Stores.BoundStore {
	async load () {
		if (this.binding.community === this.community) { return; }
		if (!this.binding.community) {
			this.set({...initialState});
			return;
		}

		const community = this.community = this.binding.community;

		if (this.cleanupListeners) { this.cleanupListeners(); }

		const onDeleting = () => this.set({deleting: true});

		community.addListener('deleting', onDeleting);
		this.cleanupListeners = () => {
			community.removeListener('deleting', onDeleting);
		};


		this.set({...initialState});

		try {
			const channelList = await community.getChannelList();

			this.set({
				loading: false,
				channelList: arr.ensure(channelList)
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}

	cleanup () {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}

	register (store) {
		this.subStores = this.subStores || new Set();

		this.subStores.add(store);
	}

	unregister (store) {
		if (this.subStores) {
			this.subStores.delete(store);
		}
	}


	async save () {
		//don't save more than once
		if (this.get('saving')) { return; }

		if (!this.subStores || this.subStores.size === 0) { return; }

		this.set({saving: true});

		const stores = Array.from(this.subStores);

		try {
			let error = false;

			await Promise.all(
				stores.map(store => store.save().catch(e => error = true))
			);

			if (!error && this.binding.afterSave) {
				this.binding.afterSave();
			}
		} finally {
			this.set({saving: false});
		}
	}


	cancel () {
		if (this.binding.onCancel) {
			this.binding.onCancel();
		}
	}
}