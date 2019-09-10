import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

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
		this.setImmediate({displayName});
	}

	setAutoSubscribe (autoSubscribe) {
		this.setImmediate({autoSubscribe});
	}

	save () {
		this.set({
			saving: true
		});
	}

	cancel () {
		if (this.binding.onCancel) {
			this.binding.onCancel();
		}
	}
}