import {Stores} from '@nti/lib-store';
import {wait} from '@nti/lib-commons';

export default class CommunityMemberShipControlStore extends Stores.BoundStore {
	load () {
		const community = this.community = this.binding.community;

		this.set({
			joined: community.isJoined,
			canJoin: community.canJoin,
			canLeave: community.canLeave
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
}