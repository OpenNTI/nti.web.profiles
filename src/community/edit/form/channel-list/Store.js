import uuid from 'uuid';
import {Stores} from '@nti/lib-store';

const NewChannel = Symbol('New Channel');

export default class ChannelListStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }
		if (this.channelList && this.binding.channellist === this.channelList) { return; }

		const channelList = this.channelList = this.binding.channelList;
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
			canCreateChannel: channelList.canCreateChannel,
			sortableChannels: sortable,
			pinnedChannels: pinned
		});
	}

	cleanup () {
		if (this.binding.unregister) { this.binding.unregister(this); }
	}

	createChannel () {
		const sortable = this.get('sortableChannels');
		const id = uuid();

		let savedChannel = null;
		let deleted = false;

		const channel = {
			//For internal tracking
			[NewChannel]: true,
			getID: () => id,
			getSavedChannel: () => savedChannel,
			getWasDeleted: () => deleted,

			//Mock data
			title: '',
			description: '',
			isModifiable: true,
			pinned: false,
			canDelete: true,
			delete: () => deleted = true,
			save: async (data) => {
				const {channelList} = this;

				savedChannel = await channelList.createChannel(data);
				return savedChannel;
			}
		};

		this.setImmediate({
			sortableChannels: [...sortable, channel]
		});
	}


	async save () {
		const {channelList} = this;
		const oldOrder = channelList.channelOrder;
		const stores = Array.from(this.subStores || []);

		await Promise.all(
			stores.map(store => store.save())
		);

		const pinned = this.get('pinnedChannels');
		const sortable = this.get('sortableChannels');

		const order = ([...pinned, ...sortable]).reduce((acc, channel) => {
			if (channel[NewChannel]) {
				const saved = channel.getSavedChannel();

				return [...acc, saved.getID()];
			}

			//TODO: check if it was deleted

			return [...acc, channel.getID()];
		}, []);

		//If nothing has changed, there's nothing to do here
		if (!orderIsDifferent(oldOrder, order)) { return; }

		try {
			await channelList.setOrder(order);
		} catch (e) {
			//TODO: figure this out
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
}

function orderIsDifferent (a, b) {
	return a.length !== b.length || a.some((k, i) => k !== b[i]);
}
