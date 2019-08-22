import {Stores} from '@nti/lib-store';
import {Array as arr} from '@nti/lib-commons';

const initialState = {
	loading: true,
	displayName: null,
	about: null,
	channels: null,
	channelOrders: null
};

export default class CommunityEditStore extends Stores.BoundStore {
	async load () {
		if (this.binding.community === this.community) { return; }
		if (!this.binding.community) {
			this.set({...initialState});
			return;
		}

		const community = this.community = this.binding.community;

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
		if (!this.subStores || this.subStores.size === 0) { return; }

		this.set({saving: true});


		const stores = Array.from(this.subStores);

		try {
			await Promise.all(
				stores.map(store => callSaveSafely(store))
			);

			if (this.binding.afterSave) {
				this.binding.afterSave();
			}
		} finally {
			this.set({saving: false});
		}
	}


	cancel () {

	}
}

async function callSaveSafely (store) {
	try {
		const resp = await store.save();

		return resp;
	} catch (e) {
		return null;
	}
}