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

	}

	async onPresenceChanged (user, presenceInfo) {

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
