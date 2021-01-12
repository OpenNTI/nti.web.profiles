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

	async load () {

	}

	async updateLastViewed (user) {

	}

	async updateUnread (user) {

	}

	async resolveChat (user) {

	}
}
