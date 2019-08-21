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

	setAbout (about) {
		this.setImmediate({about, aboutError: null});
	}

	setDisplayName (displayName) {
		this.setImmediate({displayName, displayNameError: null});
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

	async save () {
		this.set({saving: true});

		try {
			await Promise.all([
				this.saveCommunityData()
			]);

			if (this.binding.afterSave) {
				this.binding.afterSave();
			}
		} finally {
			this.set({saving: false});
		}
	}

	cancel () {
		debugger;
	}
}