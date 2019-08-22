import {Stores} from '@nti/lib-store';

export default class ChannelListStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }

		const {channelList} = this.binding;
		const {channels} = channelList;

		const {sortable, pinned} = channels.reduce((acc, channel) => {
			if (channel.pinned) {
				acc.pinned.push(channel);
			} else {
				acc.sortable.push(channel);
			}

			return acc;
		}, {sortable: [], pinned: []});

		this.set({
			sortableChannels: sortable,
			pinnedChannels: pinned
		});
	}

	cleanup () {
		if (this.binding.unregister) { this.binding.unregister(this); }
	}
}
