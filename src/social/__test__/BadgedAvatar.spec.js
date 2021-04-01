/* eslint-env jest */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

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

describe('BadgedAvatar Component', () => {
	test('BadgedAvatar Click', async () => {
		const store = new Store();

		const setSelectedEntity = jest.spyOn(store, 'setSelectedEntity');

		const clearUnreadCount = jest.spyOn(store, 'clearUnreadCount');

		store.addContact('user1');

		const component = render(
			<FakeStore mock={store}>
				<ChatBar />
			</FakeStore>
		);

		const click = () =>
			fireEvent.click(component.getByTestId('avatar-container'));

		click();

		expect(
			await waitFor(() => component.getByTestId('chat-window'))
		).toBeTruthy();

		expect(setSelectedEntity).toHaveBeenCalled();
		expect(clearUnreadCount).toHaveBeenCalled();

		click();

		expect(setSelectedEntity).toHaveBeenCalled();
	});
});
