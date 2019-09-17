import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';
import {Models} from '@nti/lib-interfaces';

export default class CommunityCreationStore extends Stores.BoundStore {
	async load () {
		const available = this.get('available');
		const displayName = this.get('displayName');
		const autoSubscribe = this.get('autoSubscribe');

		if (available != null) {
			this.set({
				displayName: displayName || '',
				autoSubscribe: autoSubscribe == null ? true : autoSubscribe
			});
			return;
		}

		this.set({
			loading: true,
			displayName: displayName || '',
			autoSubscribe: autoSubscribe == null ? true : autoSubscribe
		});

		try {
			const service = await getService();
			const communities = service.getCommunities();

			this.set({
				loading: false,
				available: communities.canCreateCommunity()
			});
		} catch (e) {
			this.set({
				loading: false,
				available: false,
				error: e
			});
		}
	}

	setDisplayName (displayName) {
		this.setImmediate({displayName, displayNameError: null, error: null});
	}

	setAutoSubscribe (autoSubscribe) {
		this.setImmediate({autoSubscribe, autoSubscribeError: null, error: null});
	}

	async save () {
		const displayName = this.get('displayName');
		const autoSubscribe = this.get('autoSubscribe');

		this.set({
			saving: true
		});

		try {
			const service = await getService();
			const communities = service.getCommunities();

			const data = {displayName};

			if (autoSubscribe) {
				data['auto_subscribe'] = Models.entities.Community.SiteAutoSubscribe;
			}

			const community = await communities.createCommunity(data);

			if (this.binding.afterSave) {
				this.binding.afterSave(community);
			}

		} catch (e) {
			if (e.field === 'alias') {
				this.set({displayNameError: e, saving: false});
			} else if (e.field === 'auto-subscribe') {
				this.set({autoSubscribeError: e, saving: false});
			} else {
				this.set({error: e, saving: false});
			}
		}
	}

	cancel () {
		if (this.binding.onCancel) {
			this.binding.onCancel();
		}
	}
}