import { Stores } from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static setActiveUsers (activeUsers) {
		this.activeUsers = normalizeActiveUsers(activeUsers);

		this.set({activeUsers: this.activeUsers});
	}

	static updatePresence (username, presence) {
		if (!presence || !username) {return;}

		this.activeUsers[username] = presence.getName();

		this.set({activeUsers: this.activeUsers});
	}

	static removeContact (user) {
		delete this.activeUsers[user.get('Username')];

		this.set({activeUsers: this.activeUsers});
	}

	static selectUser (user) {
		this.set({selectedUser: user.get('Username')});
	}

	static deselectUser () {
		this.set({selectedUser: null});
	}

	static clearUnreadCount (user) {
		this.unreadCounts[user.get('Username')] = 0;

		this.set({unreadCounts: this.unreadCounts});
	}

	static handleWindowNotify (username) {
		this.unreadCounts[username]++;

		this.set({unreadCounts: this.unreadCounts});
	}

	async load () {
		if (this.initialLoad) return;
		this.initialLoad = true;

		this.set({Loading: true});

		try {
			this.set({activeUsers: this.activeUsers});
		} catch (e) {
			this.set({
				Loading: false,
				Error: e,
			});
		}
	}
}

function normalizeActiveUsers (activeUsers) {
	return Array.isArray(activeUsers) ? Object.keys(...(activeUsers).map(x => x.username)).reduce((ret, key) => {
		ret[activeUsers[key]] = true;
		return ret;
	}, {}) : activeUsers;
}

