import { SessionStorage } from '@nti/web-storage';
import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

const STATE_KEY = 'chats';
export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	async load() {
		const service = await getService();
		this.contactStore = await service.getContacts();

		this.contactStore.addListener('change', (contacts) => this.loadContacts(contacts));

		this.set({activeChatRoomParticipants: getAllOccupantsKeyAccepted()});

		this.set({iterator: this[Symbol.iterator]});
	}

	loadContacts(contacts) {
		this.set({contacts, iterator: this[Symbol.iterator]});
	}

	[Symbol.iterator]() {
		this.snapshot =
			new Set([...Array.from(this.get('contacts') || []).map(x => x.ID), ...this.activeChatRoomParticipants || []]) || [];

		return [...this.snapshot];
	}

	static deselectUser() {
		this.getStore().setSelectedEntity();
	}

	cleanup() {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}

	cleanupListeners() {
		this.contactStore.removeListener('change', this.loadContacts);

		delete this.cleanupListeners;
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
function getSessionObject (key) {
	let o = SessionStorage.getItem(STATE_KEY) || {};
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


