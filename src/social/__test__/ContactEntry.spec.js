/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';

import { FakeStore } from '@nti/lib-store';

import { ChatBar } from '../ChatBar';
import Store from '../Store';

// Mock ChatWindow override
jest.mock('../ChatWindow', () => {
	const mockDefault = {};

	mockDefault.getChatWindow = () => props => <div {...props}>ChatWindow</div>;

	return {
		__esModule: true,
		ChatWindowRef: mockDefault,
	};
});

function useMockServer(mockService) {
	global.$AppConfig = {
		...global.$AppConfig,
		nodeService: mockService,
		nodeInterface: {
			async getServiceDocument() {
				return mockService;
			},
		},
	};
}

describe('ContactEntry Component', () => {
	test('ContactEntry Click', async () => {
		useMockServer({
			getContacts: async () => {
				return {
					addListener: () => 'Add event listener',
					[Symbol.iterator]() {
						return ['user1'];
					},
				};
			},
		});

		const store = new Store();

		const component = render(
			<FakeStore mock={store}>
				<ChatBar />
			</FakeStore>
		);

		expect(component.getByTestId('chat-window')).toBeTruthy();
	});
});
