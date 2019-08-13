import {Stores, Interfaces} from '@nti/lib-store';
import {getAppUserScopedStorage} from '@nti/web-client';
import {Array as arr} from '@nti/lib-commons';


function Storage () {
	let storage;

	return {
		read: (key) => {
			storage = storage || getAppUserScopedStorage();

			const value = storage.getItem(key);

			try {
				const json = JSON.parse(value);

				return json;
			} catch (e) {
				return {};
			}
		},
		write: (key, value) => {
			storage = storage || getAppUserScopedStorage();

			return storage.setItem(key, JSON.stringify(value));
		}
	};
}

export default
@Interfaces.Stateful('nti-community-activity-channel', ['sort', 'layout'], Storage())
class CommunityActivityChannelStore extends Stores.BoundStore {
	load () {
		//if nothing changed, don't do anything
		if (this.binding.channels === this.channels && this.binding.channelId === this.channelId) { return; }

		const channels = this.channels = this.binding.channels;
		const channelId = this.channelId = this.binding.channelId;

		const channelLists = arr.ensure(channels);

		const channel = channelLists.reduce((acc, channelList) => {
			if (acc) { return acc;}

			return channelList.findChannel(channelId);
		}, null);

		this.set({
			channel
		});
	}


	setSort (sort) {
		this.set({sort});
	}


	setLayout (layout) {
		this.set({layout});
	}
}