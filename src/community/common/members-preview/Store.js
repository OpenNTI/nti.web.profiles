import {Stores} from '@nti/lib-store';

const DefaultMax = 10;

export default class CommunityMemberPreview extends Stores.BoundStore {
	load () {
		if (this.community === this.binding.community && this.max === this.binding.max) { return; }

		const community = this.community = this.binding.community;
		this.max = this.binding.max;

		if (this.cleanupListeners) { this.cleanupListeners(); }

		const loadPreview = () => this.loadPreview();

		community.addListener('members-changed', loadPreview);

		this.cleanupListeners = () => {
			community.removeListener('members-changed', loadPreview);
			delete this.cleanupListeners;
		};

		this.loadPreview();
	}

	cleanup () {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}

	async loadPreview () {
		const {community, max} = this;

		this.set({
			loading: true,
			error: null
		});

		try {
			const membersDataSource = community.getMembersDataSource();
			const {Items, TotalItemCount} = await membersDataSource.requestPage(0, {batchSize: max || DefaultMax});
			
			const members = TotalItemCount > max ? Items.slice(0, -1) : Items;
			const remaining = Math.max(0, TotalItemCount - members.length);

			this.set({
				loading: false,
				members,
				remaining
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}
}