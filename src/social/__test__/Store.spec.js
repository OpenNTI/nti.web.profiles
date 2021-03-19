/* eslint-env jest */

import Store from '../Store';

let store;
const activeUsers = { user1: 'available', user2: 'away', user3: 'dnd' };

beforeEach(() => {
	store = new Store();
	store.setActiveUsers(activeUsers);
});

describe('Test store methods', () => {
	test('setActiveUsers', () => {
		expect(store.get('activeUsers')).toEqual(activeUsers);
	});

	test('updatePresence', () => {
		store.updatePresence('user1', 'dnd');

		expect(store.get('activeUsers')['user1']).toEqual('dnd');
	});

	test('removeContact', () => {
		store.removeContact('user1');

		expect(store.get('activeUsers')['user1']).toBeFalsy();
	});

	test('addContacts', () => {
		const contacts = [{ Username: 'user1' }];

		store.addContacts(contacts);

		expect(store.get('activeUsers')).toEqual({
			user1: { Username: 'user1' },
		});
	});

	test('selectUser', () => {
		store.selectUser('user1');

		expect(store.get('selectedUser')).toEqual('user1');
	});

	test('deselectUser', () => {
		store.selectUser('user1');

		store.deselectUser();

		expect(store.get('selectedUser')).toBeNull();
	});

	test('clearUnreadCount and handleWindowNotify', () => {
		for (let i = 0; i < 3; i++) {
			store.handleWindowNotify('user1');
		}

		expect(store.get('unreadCount')['user1']).toEqual(3);

		store.clearUnreadCount('user1');

		expect(store.get('unreadCount')['user1']).toEqual(0);
	});

	test('setCalendarWindow', () => {
		expect(store.get('calendarWindow')).toBeFalsy();

		store.setCalendarWindow(false);

		expect(store.get('calendarWindow')).toBeFalsy();

		store.setCalendarWindow(true);

		expect(store.get('calendarWindow')).toBeTruthy();
	});

	test('setChatWindow', () => {
		expect(store.get('chatWindow')).toBeFalsy();

		store.setChatWindow(false);

		expect(store.get('chatWindow')).toBeFalsy();

		store.setChatWindow(true);

		expect(store.get('chatWindow')).toBeTruthy();
	});
});
