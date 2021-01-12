import { Stores } from '@nti/lib-store';

import { subscribeToIncomingMessage, subscribeToPresenceChange } from './Socket';


export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static SetActiveUsers (ActiveUsers) {
		this.set({ActiveUsers});
	}

	async onIncomingMessage (user, message) {
		await this.resolveChatFor(user);
		this.updateUnread();
	}

	async onPresenceChanged (user, presenceInfo) {
		// TODO: this method should update the list of active users as they change their presence
	}

	async load () {
		if (this.initialLoad) return;
		this.initialLoad = true;

		// Subscribe to incoming messages
		subscribeToIncomingMessage((sender, message) => this.onIncomingMessage(sender, message));

		// Subscribe to presence change
		subscribeToPresenceChange((user, presenceInfo) => this.onPresenceChanged(user, presenceInfo));

		this.set({Loading: true});

		try {
			await this.resolveChat();
			this.updateUnread();

		} catch (e) {
			this.set({
				Loading: false,
				Error: e,
			});
		}
	}

	async resolveChat () {
		const service = await getService();
		const pageInfo = await service.getPageInfo(CONTENT_ROOT);
		// TODO: check the way to get the url
		this.url = pageInfo.getLink(MESSAGE_INBOX);

		this.get('ActiveUsers').forEach(async (user) => await this.resolveChatFor(user));
	}

	async resolveChatFor (user) {
		// TODO: check the method of getting the batch of messages for the user
		// TODO: check the service.get url
		const Batches = this.get('Batches') || {}, LastViewed = this.get('LastViewed') || {};

		Batches[user.id] = await service.getBatch(this.url, {
			batchStart: items.length,
			batchSize: BATCH_SIZE,
		});

		// TODO: check lastViewed link for the chat
		LastViewed[user.id] = new Date(parseFloat(await service.get(`${this.url}/${user.id}/lastViewed`), 10) * 1000);

		this.set({ Batches, LastViewed });
	}

	async updateUnread (user) {

	}

	async resolveChat (user) {

	}
}
