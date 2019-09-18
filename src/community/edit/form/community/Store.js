import {Stores} from '@nti/lib-store';

export default class CommunityStore extends Stores.BoundStore {
	load () {
		if (this.binding.register) { this.binding.register(this); }

		const {community} = this.binding;

		this.set({
			displayName: community ? community.displayName : '',
			about: community ? community.about : '',
			autoSubscribeRule: community && community.autoSubscribeRule
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

	setAutoSubscribeRule (autoSubscribeRule) {
		this.set({autoSubscribeRule, autoSubscribeRuleError: null});
	}

	async save () {
		const {community} = this.binding;
		const displayName = this.get('displayName');
		const about = this.get('about');
		const autoSubscribeRule = this.get('autoSubscribeRule');

		let toSave = null;

		if (displayName !== community.displayName) {
			toSave = toSave || {};
			toSave.displayName = displayName;
		}

		if (about !== community.about) {
			toSave = toSave || {};
			toSave.about = about;
		}

		if (autoSubscribeRule !== community.autoSubscribeRule) {
			toSave = toSave || {};
			toSave.autoSubscribeRule = autoSubscribeRule;
		}

		if (!toSave) { return; }

		try {
			await community.save(toSave);
		} catch (e) {
			if (e.field === 'displayName') { this.set({displayNameError: e}); }
			if (e.field === 'about') { this.set({aboutError: e}); }
			if (e.field === 'autoSubscribeRule') { this.set({autoSubscribeRuleError: e}); }

			throw e;
		}
	}
}