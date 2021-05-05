/* eslint-env jest */
import { setupTestClient } from '@nti/web-client/test-utils';
jest.doMock('@nti/lib-interfaces', () => ({
	UserPresence: {
		[Symbol.iterator]: () => [][Symbol.iterator](),
		addListener: jest.fn(),
		removeListener: jest.fn(),
	},
}));

import Store from '../Store';

describe('Test store methods', () => {
	const activeUsers = [{ ID: 'user1' }, { ID: 'user2' }, { ID: 'user3' }];
	let store;

	beforeEach(() => {
		setupTestClient({
			getContacts() {
				return {
					addListener: jest.fn(),
					removeListener: jest.fn(),
					contains() {},
				};
			},
		});
		store = new Store();
		activeUsers.forEach(user =>
			store.set({
				activeUsers: [...(store.get('activeUsers') || []), user],
			})
		);
	});
	test('selectUser', () => {
		store.setSelectedEntity('user1');

		expect(store.get('selectedEntity')).toEqual('user1');
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

	test('setSelectedEntity', () => {
		expect(store.get('selectedEntity')).toBeFalsy();

		store.setSelectedEntity();

		expect(store.get('selectedEntity')).toBeFalsy();

		store.setSelectedEntity('user1');

		expect(store.get('selectedEntity')).toBe('user1');
	});
});
