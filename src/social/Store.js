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
		const activeUsers = { ...this.get('activeUsers') };

		delete activeUsers[username];

		this.set({ activeUsers });
	}

	static addContacts(users) {
		this.getStore().addContacts(users);
	}

	addContacts(users) {
		const activeUsers = users.reduce(
			(acc, user) => ({ ...acc, [user.Username]: user }),
			{}
		);
		this.set({ activeUsers });
	}

	selectUser(username) {
		this.set({ selectedUser: username });
	}

	static deselectUser() {
		this.getStore().deselectUser();
	}

	deselectUser() {
		this.set({ selectedUser: null });
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
		const counts = this.get('unreadCount');

		this.set({
			unreadCount: {
				...counts,
				[username]: (counts?.[username] || 0) + 1,
			},
		});
	}

	setCalendarWindow(calendarWindow) {
		this.set({ calendarWindow });
		calendarWindow && this.set({ chatWindow: false });
	}

	setChatWindow(chatWindow) {
		this.set({ chatWindow });
		chatWindow && this.set({ calendarWindow: false });
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
