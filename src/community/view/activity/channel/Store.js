import {Stores, Interfaces} from '@nti/lib-store';
import {getAppUserScopedStorage} from '@nti/web-client';
import {Array as arr} from '@nti/lib-commons';

import {Grid} from '../Constants';

function findChannel (channelLists, channelId) {
	const find = (id) => (
		channelLists.reduce((acc, channelList) => {
			if (acc) { return acc; }

			return channelList.findChannel(id);
		}, null)
	);

	//Work around for react-router dorking the pathname...
	return find(channelId) || find(encodeURIComponent(channelId));
}

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
@Interfaces.Stateful('nti-community-activity-channel', ['sortOn', 'layout'], Storage())
class CommunityActivityChannelStore extends Stores.BoundStore {
	load () {
		//if nothing changed, don't do anything
		if (this.binding.channels === this.channels && this.binding.channelId === this.channelId) { return; }

		const channels = this.channels = this.binding.channels;
		const channelId = this.channelId = this.binding.channelId;

		const channelLists = arr.ensure(channels);

		const channel = findChannel(channelLists, channelId);

		const oldSort = this.get('sortOn');
		const knownSorts = channel && channel.contentsDataSource && channel.contentsDataSource.getKnownParam('sortOn');

		const sortOn = oldSort && knownSorts.indexOf(oldSort) >= 0 ? oldSort : knownSorts[0];

		this.set({
			channel,
			sortOn,
			layout: this.get('layout') || Grid,
			availableSorts: knownSorts
		});
	}


	setSortOn (sortOn) {
		this.set({sortOn});
	}


	setLayout (layout) {
		this.set({layout});
	}
}