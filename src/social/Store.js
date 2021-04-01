import { Stores } from '@nti/lib-store';

export default class Store extends Stores.SimpleStore {
	static Singleton = true;

	static removeContact(username) {
		this.getStore().removeContact(username);
	}

	removeContact(username) {
		if (username === this.get('selectedEntity')) {
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
