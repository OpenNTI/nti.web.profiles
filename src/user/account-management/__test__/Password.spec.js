/* eslint-env jest */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupTestClient, primeMockedReader } from '@nti/web-client/test-utils';
import { useService } from '@nti/web-core';

import { Password } from '../tabs/password/View';

const changePassword = jest.fn();

beforeEach(async () => {
	setupTestClient({
		getAppUser: async () => {
			return {
				changePassword,
			};
		},
		capabilities: {
			canChangePassword: true,
		},
	});

	await primeMockedReader(useService);
});

async function getInputs(component) {
	return {
		oldPassword: await component.findByTestId('input-oldPassword'),
		newPassword: await component.findByTestId('input-newPassword'),
		repeatedPassword: await component.findByTestId(
			'input-repeatedPassword'
		),
	};
}

test('old equals new', async () => {
	const component = render(<Password />);

	const { oldPassword, newPassword, repeatedPassword } = await getInputs(
		component
	);

	const samePassword = 'password';

	userEvent.type(oldPassword, samePassword);
	userEvent.type(newPassword, samePassword);
	userEvent.type(repeatedPassword, samePassword);

	userEvent.click(component.queryByTestId('change-password-submit-btn'));

	await waitFor(() => {
		expect(component.queryByTestId('change-password-error')).toBeTruthy();
	});
});

test("new doesn't equal repeated", async () => {
	const component = render(<Password />);

	const { oldPassword, newPassword, repeatedPassword } = await getInputs(
		component
	);

	userEvent.type(oldPassword, 'old-password');
	userEvent.type(newPassword, 'new-password');
	userEvent.type(repeatedPassword, 'different-password');

	userEvent.click(component.queryByTestId('change-password-submit-btn'));

	await waitFor(() =>
		expect(component.queryByTestId('change-password-error')).toBeTruthy()
	);
});

test('Password changes successfully', async () => {
	const component = render(<Password />);

	// Get the input nodes or whatever they're called.
	const { oldPassword, newPassword, repeatedPassword } = await getInputs(
		component
	);

	// Fill out the inputs.
	userEvent.type(oldPassword, 'old-password');
	userEvent.type(newPassword, 'new-password');
	userEvent.type(repeatedPassword, 'new-password');

	// Click submit to submit the form.
	userEvent.click(component.queryByTestId('change-password-submit-btn'));

	await waitFor(() => {
		// Makes sure changePassword was called with correct args.
		expect(changePassword).toHaveBeenCalledWith(
			'new-password',
			'old-password'
		);
		// Make sure success message is there.
		expect(component.queryByTestId('change-password-success')).toBeTruthy();
		// Make sure no errors encountered.
		expect(component.queryByTestId('change-password-error')).toBeFalsy();
	});
});

test('User cannot change password.', async () => {
	setupTestClient({
		capabilities: {
			canChangePassword: false,
		},
	});
	await primeMockedReader(useService);

	const component = render(<Password />);

	await waitFor(() =>
		expect(
			component.queryByTestId('password-change-disallowed')
		).toBeTruthy()
	);
});
