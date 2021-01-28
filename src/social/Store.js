import { Stores } from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static setActiveUsers (activeUsers) {
		this.getStore().activeUsers = normalizeActiveUsers(activeUsers);

		this.getStore().set({ activeUsers: this.getStore().activeUsers });
	}

	/**
	 * @param {string} username - user id
	 * @param {string} presence - name of presence state
	 * @returns {void}
	 */
	static updatePresence (username, presence) {
		if (!presence || !username) {return;}

		this.getStore().activeUsers = {
			...this.getStore().activeUsers,
			[username]: presence,
		};

		this.getStore().set({ activeUsers: this.activeUsers });
	}

	static removeContact (username) {
		const activeUsers = this.getStore().get('activeUsers');

		delete activeUsers[username];

		this.getStore().set({ activeUsers });
	}

	static selectUser (username) {
		this.getStore().set({ selectedUser: username });
	}

	static deselectUser () {
		this.getStore().set({ selectedUser: null });
	}

	static clearUnreadCount (username) {
		let unreadCounts = this.getStore().get('unreadCounts');
		unreadCounts = {
			...unreadCounts,
			[username]: 0,
		};

		this.getStore().set({ unreadCounts });
	}

	static handleWindowNotify (username) {
		let unreadCounts = this.getStore().get('unreadCounts');

		const oldValue = username in unreadCounts || 0;

		unreadCounts = {
			...unreadCounts,
			[username]: oldValue + 1,
		};

		this.getStore().set({ unreadCounts });
	}
}

function normalizeActiveUsers (activeUsers) {
	return Array.isArray(activeUsers) ? Object.keys(...(activeUsers).map(x => x.username)).reduce((ret, key) => {
		ret[activeUsers[key]] = true;
		return ret;
	}, {}) : activeUsers;
}

