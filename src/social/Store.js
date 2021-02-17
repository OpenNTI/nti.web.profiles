import { Stores } from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static setActiveUsers (activeUsers) {
		this.getStore().setActiveUsers(activeUsers);
	}

	setActiveUsers (activeUsers) {
		this.activeUsers = normalizeActiveUsers(activeUsers);

		this.set({ activeUsers: this.activeUsers });
	}

	/**
	 * @param {string} username - user id
	 * @param {string} presence - name of presence state
	 * @returns {void}
	 */
	static updatePresence (username, presence) {
		this.getStore().updatePresence(username, presence);
	}

	updatePresence (username, presence) {
		if (!presence || !username) { return; }

		this.activeUsers = {
			...this.activeUsers,
			[username]: presence,
		};

		this.set({ activeUsers: this.activeUsers });
	}

	static removeContact (username) {
		this.getStore().removeContact(username);
	}

	removeContact (username) {
		const activeUsers = this.get('activeUsers');

		activeUsers && delete activeUsers[username];

		this.set({ activeUsers });
	}

	static addContacts (users) {
		this.getStore().addContacts(users);
	}

	addContacts (users) {
		const activeUsers = users.reduce((acc, user) => ({ ...acc, [user.Username]: user }), {});
		this.set({activeUsers});
	}

	selectUser (username) {
		this.set({selectedUser: username});
	}

	static deselectUser () {
		this.getStore().deselectUser();
	}

	deselectUser () {
		this.set({ selectedUser: null });
	}

	clearUnreadCount (username) {
		let unreadCount = this.get('unreadCount');
		unreadCount = {
			...unreadCount,
			[username]: 0,
		};

		this.set({ unreadCount });
	}

	static handleWindowNotify (username) {
		this.getStore().handleWindowNotify(username);
	}

	handleWindowNotify (username) {
		let unreadCount = this.get('unreadCount') || {};

		const oldValue = unreadCount[username] || 0;

		unreadCount = {
			...unreadCount,
			[username]: oldValue + 1,
		};

		this.set({ unreadCount });
	}

	setCalendarWindow (calendarWindow) {
		this.set({ calendarWindow });
		calendarWindow && this.set({ chatWindow: false });
	}

	setChatWindow (chatWindow) {
		this.set({ chatWindow });
		chatWindow && this.set({ calendarWindow: false });
	}
}

function normalizeActiveUsers (activeUsers) {
	return Array.isArray(activeUsers) ? Object.keys(...(activeUsers).map(x => x.username)).reduce((ret, key) => {
		ret[activeUsers[key]] = true;
		return ret;
	}, {}) : activeUsers;
}

