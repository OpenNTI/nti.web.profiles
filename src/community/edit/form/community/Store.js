import {Stores} from '@nti/lib-store';

export default class CommunityStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }

		const {community} = this.binding;

		this.set({
			displayName: community ? community.displayName : '',
			about: community ? community.about : ''
		});
	}

	cleanup () {
		if (this.binding.unregister) { this.binding.unregister(this); }
	}

	setDisplayName (displayName) {
		this.setImmediate({displayName, displayNameError: null});
	}

	setAbout (about) {
		this.setImmediate({about, aboutError: null});
	}

	async save () {
		const {community} = this.binding;
		const displayName = this.get('displayName');
		const about = this.get('about');

		try {
			await community.save({displayName, about});
		} catch (e) {
			if (e.field === 'displayName') { this.set({displayNameError: e}); }
			if (e.field === 'about') { this.set({about: e}); }

			throw e;
		}
	}
}