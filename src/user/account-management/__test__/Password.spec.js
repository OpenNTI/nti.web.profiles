/* eslint-env jest */
import { render, fireEvent, waitFor } from '@testing-library/react';

import { setupTestClient } from '@nti/web-client/test-utils';

import PasswordView from '../tabs/Password';

const changePassword = jest.fn();

const getMockService = () => {
	return {
		getAppUser: async () => {
			return {
				changePassword: (newPassword, oldPassword) =>
					changePassword(newPassword, oldPassword),
			};
		},
	};
};

beforeAll(() => setupTestClient(getMockService()));

function getInputs(component) {
	return {
		oldPassword: component.queryByTestId('input-oldPassword'),
		newPassword: component.queryByTestId('input-newPassword'),
		repeatedPassword: component.queryByTestId('input-repeatedPassword'),
	};
}

test('old equals new', async () => {
	const component = render(<PasswordView />);

	expect(
		component.queryByTestId('submit-btn').classList.contains('disabled')
	).toBeTruthy();

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	const samePassword = 'password';

	fireEvent.change(oldPassword, { target: { value: samePassword } });
	fireEvent.change(newPassword, { target: { value: samePassword } });
	fireEvent.change(repeatedPassword, { target: { value: samePassword } });

	expect(
		component.queryByTestId('submit-btn').classList.contains('disabled')
	).toBeFalsy();

	await waitFor(() => fireEvent.click(component.queryByTestId('submit-btn')));

	expect(component.queryByTestId('error')).toBeTruthy();
});

test("new doesn't equal repeated", async () => {
	const component = render(<PasswordView />);

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	fireEvent.change(oldPassword, { target: { value: 'old-password' } });
	fireEvent.change(newPassword, { target: { value: 'new-password' } });
	fireEvent.change(repeatedPassword, {
		target: { value: 'different-password' },
	});

	await waitFor(() => fireEvent.click(component.queryByTestId('submit-btn')));

	expect(component.queryByTestId('error')).toBeTruthy();
});

test('Password changes successfully', async () => {
	const component = render(<PasswordView />);

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	fireEvent.change(oldPassword, { target: { value: 'old-password' } });
	fireEvent.change(newPassword, { target: { value: 'new-password' } });
	fireEvent.change(repeatedPassword, { target: { value: 'new-password' } });

	await waitFor(() => fireEvent.click(component.queryByTestId('submit-btn')));

	expect(changePassword).toHaveBeenCalledWith('new-password', 'old-password');
	expect(component.queryByTestId('success')).toBeTruthy();
	expect(component.queryByTestId('error')).toBeFalsy();
});
