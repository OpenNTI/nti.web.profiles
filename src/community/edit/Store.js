import {Stores} from '@nti/lib-store';
import {Array as arr} from '@nti/lib-commons';

const initialState = {
	loading: true,
	displayName: null,
	about: null,
	channels: null,
	channelOrders: null
};

function getChannelListState (channelList) {
	channelList = arr.ensure(channelList);

	return channelList.map((list) => {
		const order = list.channelOrder;
		const channels = list.channels.reduce((acc, channel) => {
			return {
				...acc,
				[channel.getID()]: {
					id: channel.getID(),
					title: channel.title,
					description: channel.description,
					editable: channel.isModifiable,
					pinned: channel.pinned
				}
			};
		}, {});

		return {
			label: list.label,
			id: list.getID(),
			canCreateChannel: list.canCreateChannels,
			channels,
			order
		};
	});
}

function clearChannelListErrors (oldList, newList, errors) {
	if (!errors) { return null; }
}

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
				about: community.about,
				displayName: community.displayName,
				originalChannelList: arr.ensure(channelList),
				channelList: getChannelListState(channelList)
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}

	setAbout (about) {
		this.setImmediate({about, aboutError: null});
	}

	setDisplayName (displayName) {
		this.setImmediate({displayName, displayNameError: null});
	}

	setChannelList (channelList) {
		const oldList = this.get('channelList');
		const oldErrors = this.get('channelListErrors');

		this.setImmediate({channelList});
		this.set({
			channelListErrors: clearChannelListErrors(oldList, channelList, oldErrors)
		});
	}

	async saveCommunityData () {
		const {community} = this;
		const displayName = this.get('displayName');
		const about = this.get('about');

		let toSave = null;

		if (displayName !== community.displayName) {
			toSave = toSave || {};
			toSave.displayName = displayName;
		}

		if (about !== community.about) {
			toSave = toSave || {};
			toSave.about = about;
		}

		if (!toSave) { return; }

		try {
			await community.save(toSave);
		} catch (e) {
			if (e.field === 'displayName') { this.set({displayNameError: e}); }
			if (e.field === 'about') { this.set({'aboutError': e}); }

			throw e;
		}
	}

	async saveChannel (channel, update) {
		let toSave = null;

		if (update.title !== channel.title) {
			toSave = toSave || {};
			toSave.title = update.title;
		}

		if (update.description !== channel.description) {
			toSave = toSave || {};
			toSave.description = update.description;
		}

		if (!toSave) { return; }

		try {
			await channel.save(toSave);
		} catch (e) {
			//TODO: show error
		}
	}

	async saveChannelList (list, update) {
		try {
			await Promise.all(
				list.channels.map((channel) => {
					return this.saveChannel(channel, update.channels[channel.getID()]);
				})
			);

			//TODO: create new channels
			//TODO: update order
		} catch (e) {
			//TODO: show error
		}
	}

	async saveChannelLists () {
		const originalChannelList = this.get('originalChannelList');
		const channelList = this.get('channelList');

		const updateMap = channelList.reduce((acc, list) => ({...acc, [list.id]: list}), {});

		for (let list of originalChannelList) {
			try {
				await this.saveChannelList(list, updateMap[list.getID()]);
			} catch (e) {
				//TODO: show error
			}
		}
	}

	async save () {
		this.set({saving: true});

		try {
			await Promise.all([
				this.saveCommunityData(),
				this.saveChannelLists()
			]);

			if (this.binding.afterSave) {
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