import {Stores, Interfaces} from '@nti/lib-store';
import {getAppUserScopedStorage} from '@nti/web-client';
import {Array as arr} from '@nti/lib-commons';

import {Grid} from '../Constants';



function findChannel (channelLists, channelId) {
	const channel = channelLists.reduce((acc, channelList) => {
		if (acc) { return acc; }

		return channelList.findChannel(channelId);
	}, null);

	if (channel) { return channel; }

	//Hack to work around react router mangling the paths
	return channelLists.reduce((acc, channelList) => {
		if (acc) { return acc; }

		return (channelList.channels || []).reduce((found, searching) => {
			if (found) { return found; }
			if (decodeURIComponent(searching.getID()) === channelId) { return searching; }

			return found;
		}, null);
	}, null);
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

		if (!channel) {
			this.set({
				notFound: true
			});
			return;
		}

		const oldSort = this.get('sortOn');
		const knownSorts = channel && channel.contentsDataSource && channel.contentsDataSource.getKnownParam('sortOn');

		const sortOn = oldSort && knownSorts.indexOf(oldSort) >= 0 ? oldSort : knownSorts[0];

		this.set({
			notFound: false,
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