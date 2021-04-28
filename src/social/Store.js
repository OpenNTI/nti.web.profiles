import { SessionStorage } from '@nti/web-storage';
import { Stores } from '@nti/lib-store';
import { UserPresence } from '@nti/lib-interfaces';
import { getAppUsername } from '@nti/web-client';

const STATE_KEY = 'chats';
export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	constructor(...args) {
		super(...args);

		(async () => {
			UserPresence.addListener('change', this.onContactChange);

			this.set({
				activeChatRoomParticipants: getAllOccupantsKeyAccepted(),
			});
		})();
	}

	iterator = this[Symbol.iterator];

	[Symbol.iterator]() {
		const snapshot = [
			...new Set([
				// move active to the top
				...(this.activeChatRoomParticipants || []),
				// inactive and duplicates at the bottom
				...Array.from(UserPresence)
					.map(x => x.username)
					.filter(x => x !== getAppUsername()),
			]),
		];

		return snapshot[Symbol.iterator]();
	}

	onContactChange = () => {
		this.emitChange(['contactStore', 'iterator', Symbol.iterator]);
	};

	cleanup() {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}

	cleanupListeners() {
		UserPresence.removeListener('change', this.onContactsChange);

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
function getSessionObject(key) {
	let o = SessionStorage.getItem(STATE_KEY) || {};
	if (key) {
		return o[key];
	}
	return o;
}

function getAllOccupantsKeyAccepted() {
	const accepted = getSessionObject('roomIdsAccepted');
	return Object.keys(accepted || {});
}
