import {Stores} from '@nti/lib-store';

export default class CommunityChannelsStore extends Stores.BoundStore {
	async load () {
		//If nothing changed, there's nothing to do here
		if (this.binding === this.community) { return; }

		const community = this.community = this.binding;

		this.set({
			loading: true,
			channels: null,
			error: null
		});

		try {
			const channelList = await community.getChannelList();

			this.set({
				loading: false,
				channels: channelList
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}
}
