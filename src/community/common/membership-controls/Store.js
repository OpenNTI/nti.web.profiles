import {Stores} from '@nti/lib-store';
import {wait} from '@nti/lib-commons';
import {getAppUsername} from '@nti/web-client';

export default class CommunityMemberShipControlStore extends Stores.BoundStore {
	load () {
		const community = this.community = this.binding.community;

		if (this.cleanupListeners) { this.cleanupListeners(); }

		const update = (e) => this.update(e);

		community.addListener('members-changed', update);

		this.cleanupListeners = () => {
			community.removeListener('members-changed', update);
			delete this.cleanupListeners;
		};

		this.set({
			joined: community.isJoined,
			canJoin: community.canJoin,
			canLeave: community.canLeave
		});
	}

	cleanup () {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}


	update ({Added, Removed}) {
		const appUser = getAppUsername();
		const added = Boolean((Added || []).find(u => u === appUser));
		const removed = Boolean((Removed || []).find(u => u === appUser));

		if (!added && !removed) { return; }
		
		setImmediate(async () => {
			await this.community.refresh();
			this.load();
		});
	}


	async join () {
		const {community} = this;		
		const minWait = wait.min(wait.SHORT);

		this.set({
			joining: true,
			error: null
		});

		try {
			await community.join();
			await minWait();

			this.set({
				joining: false,
				joined: community.isJoined,
				canJoin: community.canJoin,
				canLeave: community.canLeave
			});
		} catch (e) {
			this.set({
				joining: false,
				error: e
			});
		}

	}


	async leave () {
		const {community} = this;
		const minWait = wait.min(wait.SHORT);

		this.set({
			leaving: true,
			error: null
		});

		try {
			await community.leave();
			await this.checkAccess();
			await minWait();

			this.set({
				leaving: false,
				joined: community.isJoined,
				canJoin: community.canJoin,
				canLeave: community.canLeave
			});
		} catch (e) {
			this.set({
				leaving: false,
				error: e
			});
		}
	}


	async checkAccess () {
		const {community} = this;

		try {
			await community.refresh();
		} catch (e) {
			if (this.binding.onNoAccess) {
				this.binding.onNoAccess();
			}
		}
	}
}