import {Stores} from '@nti/lib-store';

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
			// const channelList = await community.getChannelList();

			this.set({
				loading: false,
				about: community.about,
				displayName: community.displayName
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}
}