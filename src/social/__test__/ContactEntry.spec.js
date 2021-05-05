/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';

import { FakeStore } from '@nti/lib-store';
import { setupTestClient } from '@nti/web-client/test-utils';

import { ChatBar } from '../ChatBar';
import Store from '../Store';

jest.doMock('@nti/lib-interfaces', () => ({
	UserPresence: {
		[Symbol.iterator]() {
			return ['user1'][Symbol.iterator]();
		},
		addListener: jest.fn(),
		removeListener: jest.fn(),
	},
}));

// Mock ChatWindow override
jest.mock('../ChatWindow', () => {
	const mockDefault = {};

	mockDefault.getChatWindow = () => props => <div {...props}>ChatWindow</div>;

	return {
		__esModule: true,
		ChatWindowRef: mockDefault,
	};
});
setupTestClient({
	getContacts() {
		return {
			addListener: jest.fn(),
			removeListener: jest.fn(),
			contains: () => true,
		};
	},
});

describe('ContactEntry Component', () => {
	test('ContactEntry Click', async () => {
		const store = new Store();

		const component = render(
			<FakeStore mock={store}>
				<ChatBar />
			</FakeStore>
		);

		expect(component.getByTestId('chat-window')).toBeTruthy();
	});
});
