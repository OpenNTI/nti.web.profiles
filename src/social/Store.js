import { Stores } from '@nti/lib-store';

import { subscribeToIncomingMessage, subscribeToPresenceChange } from './Socket';


export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static SetActiveUsers (ActiveUsers) {
		this.set({ActiveUsers});
	}

	async OnIncomingMessage (sender, message) {

	}

	async OnPresenceChanged (user, presenceInfo) {

	}

	async Load () {

	}

	async UpdateLastViewed (user) {

	}

	async UpdateUnread (user) {

	}

	async ResolveChat (user) {

	}

	ExpandContacts () {

	}

	ShowChatWindow (chat) {

	}
}
