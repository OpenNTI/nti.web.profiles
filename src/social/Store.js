import { SessionStorage } from '@nti/web-storage';
import { Stores } from '@nti/lib-store';
import { UserPresence } from '@nti/lib-interfaces';
import { getAppUsername, getService } from '@nti/web-client';
import { buffer } from '@nti/lib-commons';

const STATE_KEY = 'chats';
export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	#contacts = null;

	constructor(...args) {
		super(...args);

		(async () => {
			const service = await getService();
			const contacts = (this.#contacts = service.getContacts());
			const presence = UserPresence;

			const onChange = buffer(100, () => {
				this.emitChange(['iterator', Symbol.iterator]);
			});

			presence.addListener('change', onChange);
			contacts.addListener('change', onChange);

			this.cleanupListeners = () => {
				contacts.removeListener('change', onChange);
				presence.removeListener('change', onChange);
			};

			onChange();
		})();
	}

	get activeChatRoomParticipants() {
		const participants = new Set(getAllOccupantsKeyAccepted());
		const unread = this.get('unreadCount') || {};
		for (const [user, count] of Object.entries(unread)) {
			if (count >= 0) participants.add(user);
		}
		return Array.from(participants);
	}

	iterator = this[Symbol.iterator];

	[Symbol.iterator]() {
		const intersection = Array.from(UserPresence)
			.map(x => x.username)
			.filter(
				userId =>
					userId !== getAppUsername() &&
					this.#contacts?.contains(userId)
			);

		const snapshot = [
			...new Set([
				// move active to the top
				...this.activeChatRoomParticipants,
				// inactive and duplicates at the bottom
				...intersection,
			]),
		];

		return snapshot[Symbol.iterator]();
	}

	cleanup() {
		this.cleanupListeners?.();
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
