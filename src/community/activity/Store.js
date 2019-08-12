import {Stores} from '@nti/lib-store';

function getActiveChannel (channels, id) {
	if (!id) { return null; }

	debugger;
}

export default class CommunityChannelsStore extends Stores.BoundStore {
	async load () {
		//If nothing changed, there's nothing to do here
		if (this.binding.community === this.community && this.binding.activeChannelId === this.activeChannelId) { return; }

		const {community, activeChannelId} = this.binding;

		this.activeChannelId = activeChannelId;
		
		if (this.community === community) {
			this.set({
				activeChannel: getActiveChannel(this.get('channels'), activeChannelId)
			});
			return;
		}

		this.community = community;

		this.set({
			loading: true,
			channels: null,
			error: null
		});

		try {
			const channelList = await community.getChannelList();

			this.set({
				loading: false,
				channels: channelList,
				activeChannel: getActiveChannel(channelList, activeChannelId)
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}


	setupListeners (community) {
		if (this.cleanupListeners) { this.cleanupListeners(); }

		const onChange = () => {
			this.set({
				displayName: community.displayName,
				about: community.about
			});
		};

		community.addListener('change', onChange);
		this.cleanupListeners = () => {
			community.removeListener('change', onChange);
			delete this.cleanupListeners;
		};
	}
}
