/* eslint-env jest */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupTestClient } from '@nti/web-client/test-utils';

import { Password } from '../tabs/Password';

const changePassword = jest.fn();

const getMockService = () => {
	return {
		getAppUser: async () => {
			return {
				changePassword,
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
	const component = render(<Password />);

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	const samePassword = 'password';

	userEvent.type(oldPassword, samePassword);
	userEvent.type(newPassword, samePassword);
	userEvent.type(repeatedPassword, samePassword);

	userEvent.click(component.queryByTestId('submit-btn'));

	await waitFor(() => expect(component.queryByTestId('error')).toBeTruthy());
});

test("new doesn't equal repeated", async () => {
	const component = render(<Password />);

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	userEvent.type(oldPassword, 'old-password');
	userEvent.type(newPassword, 'new-password');
	userEvent.type(repeatedPassword, 'different-password');

	userEvent.click(component.queryByTestId('submit-btn'));

	await waitFor(() => expect(component.queryByTestId('error')).toBeTruthy());
});

test('Password changes successfully', async () => {
	const component = render(<Password />);

	// Get the input nodes or whatever they're called.
	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	// Fill out the inputs.
	userEvent.type(oldPassword, 'old-password');
	userEvent.type(newPassword, 'new-password');
	userEvent.type(repeatedPassword, 'new-password');

	// Click submit to submit the form.
	userEvent.click(component.queryByTestId('submit-btn'));

	await waitFor(() => {
		// Makes sure changePassword was called with correct args.
		expect(changePassword).toHaveBeenCalledWith(
			'new-password',
			'old-password'
		);
		// Make sure success message is there.
		expect(component.queryByTestId('success')).toBeTruthy();
		// Make sure no errors encountered.
		expect(component.queryByTestId('error')).toBeFalsy();
	});
});
