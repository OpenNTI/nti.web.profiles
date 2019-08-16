import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

export default class CommunityActivityTopic extends Stores.BoundStore {
	needsUpdate () {
		return this.binding.channel !== this.channel ||
			this.binding.topicId !== this.topicId;
	}

	async load () {
		if (!this.needsUpdate()) { return; }

		this.channel = this.binding.channel;
		const topicId = this.topicId = this.binding.topicId;

		this.set({
			loading: true
		});

		try {
			const service = await getService();
			const topic = await service.getObject(topicId);

			this.set({
				loading: false,
				topic
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}
}