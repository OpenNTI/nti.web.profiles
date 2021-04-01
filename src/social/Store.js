import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	cleanup() {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}

	cleanupListeners() {
		this.contactStore.removeListener('remove', this.removeContact);
		this.contactStore.removeListener('add', this.addContact);

		delete this.cleanupListeners;
	}

	async load() {
		const service = await getService();
		this.contactStore = await service.getContacts();
		this.contactStore.on('remove', (username) => this.removeContact(username));
		this.contactStore.on('add', (username) => this.addContact(username));
	}

	static removeContact(username) {
		this.getStore().removeContact(username);
	}

	removeContact(username) {
		if (username === this.get('selectedEntity')?.ID) {
			return;
		}

		this.set({
			activeUsers: this.get('activeUsers').filter(user => user.ID !== username),
		});
	}

	static addContact(user) {
		this.getStore().addContact(user);
	}

	addContact(user) {
		let duplicate = false;
		const activeUsers = this.get('activeUsers') || [];

		activeUsers.some((u) => {
			duplicate = u.ID === user.ID;
			return duplicate;
		});

		if (!duplicate) {
			this.set({
				activeUsers: [...(this.get('activeUsers') || []), user],
			});
		}
	}

	static deselectUser() {
		this.getStore().setSelectedEntity();
	}

	clearUnreadCount(username) {
		this.set({
			unreadCount: {
				...this.get('unreadCount'),
				[username]: 0,
			},
		});
	}

	static handleWindowNotify(username) {
		this.getStore().handleWindowNotify(username);
	}

	handleWindowNotify(username) {
		this.set({
			unreadCount: {
				...this.get('unreadCount'),
				[username]: (this.get('unreadCount')?.[username] || 0) + 1,
			},
		});
	}

	setCalendarWindow(calendarWindow) {
		this.set({ calendarWindow });
		if (calendarWindow) {
			this.set({ selectedEntity: null });
		}
	}

	setSelectedEntity(entity) {
		this.set({ selectedEntity: entity });
		if (entity) {
			this.set({ calendarWindow: false });
		}
	}

}

// TODO: use active chats
/**
function getSessionObject (key) {
	let o = SessionStorage.getItem('chats') || {};
	if (key) {
		return o[key];
	}
	return o;
}

function getAllOccupantsKeyAccepted () {
	let accepted = getSessionObject('roomIdsAccepted') || {},
		pairs = [],
		key;

	for (key in accepted) {
		if (accepted.hasOwnProperty(key)) {
			pairs.push(key);
		}
	}

	return pairs;
}
*/

