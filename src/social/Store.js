import { Stores } from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static setActiveUsers(activeUsers) {
		this.getStore().setActiveUsers(activeUsers);
	}

	setActiveUsers(activeUsers) {
		activeUsers = normalizeActiveUsers(activeUsers);

		this.set({ activeUsers });
	}

	/**
	 * @param {string} username - user id
	 * @param {string} presence - name of presence state
	 * @returns {void}
	 */
	static updatePresence(username, presence) {
		this.getStore().updatePresence(username, presence);
	}

	updatePresence(username, presence) {
		if (!presence || !username) {
			return;
		}

		const activeUsers = {
			...this.get('activeUsers'),
			[username]: presence,
		};

		if (presence === 'unavailable') {
			delete activeUsers[username];
		}

		this.set({ activeUsers });
	}

	static removeContact(username) {
		this.getStore().removeContact(username);
	}

	removeContact(username) {
		this.set({
			activeUsers: {
				...this.get('activeUsers'),
				[username]: undefined,
			},
		});
	}

	static addContacts(users) {
		this.getStore().addContacts(users);
	}

	addContacts(users) {
		this.set({
			activeUsers: [...this.get('activeUsers'), ...users],
		});
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
		calendarWindow && this.set({ selectedEntity: null });
	}

	setSelectedEntity(entity) {
		this.set({ selectedEntity: entity });
		entity && this.set({ calendarWindow: false });
	}
}

function normalizeActiveUsers(activeUsers) {
	return Array.isArray(activeUsers)
		? activeUsers.reduce(
				(ret, x) => ({
					...ret,
					[x.username]: true,
				}),
				{}
		  )
		: { ...activeUsers };
}
