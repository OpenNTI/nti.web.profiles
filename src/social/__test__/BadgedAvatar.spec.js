/* eslint-env jest */
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';

import {FakeStore} from '@nti/lib-store';

import BadgedAvatar from '../BadgedAvatar';
import Store from '../Store';

// Mock ChatWindow override
jest.mock('../ChatWindow', () => {
	const mockDefault = {};

	mockDefault.getChatWindow = () => (props) => <div {...props}>ChatWindow</div>;

	return {
		__esModule: true,
		default: mockDefault,
	};
});

describe('BadgedAvatar Component', () => {
	test('BadgedAvatar Click', async () => {
		const store = new Store();

		const setChatWindow = jest.spyOn(store, 'setChatWindow');

		const clearUnreadCount = jest.spyOn(store, 'clearUnreadCount');

		const selectUser = jest.spyOn(store, 'selectUser');

		const deselectUser = jest.spyOn(store, 'deselectUser');

		const component = render(
			<FakeStore mock={store}>
				<BadgedAvatar entity="selected_user" presence="away"/>
			</FakeStore>
		);

		const click = () => fireEvent.click(component.getByTestId('avatar-container'));

		click();

		expect(await waitFor(() => component.getByTestId('chat-window'))).toBeTruthy();

		expect(setChatWindow).toHaveBeenCalled();
		expect(clearUnreadCount).toHaveBeenCalled();
		expect(selectUser).toHaveBeenCalledWith('selected_user');

		click();

		expect(deselectUser).toHaveBeenCalled();
	});
});
