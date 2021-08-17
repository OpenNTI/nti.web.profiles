/* eslint-env jest */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';

import { setupTestClient } from '@nti/web-client/test-utils';

import { Password } from '../tabs/password/View';

const changePassword = jest.fn();

const getMockService = () => {
	return {
		getAppUser: async () => {
			return {
				changePassword,
			};
		},
		capabilities: {
			canChangePassword: true,
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
	const component = await waitFor(() => render(<Password />));

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	const samePassword = 'password';

	userEvent.type(oldPassword, samePassword);
	userEvent.type(newPassword, samePassword);
	userEvent.type(repeatedPassword, samePassword);

	await waitFor(() => {
		userEvent.click(component.queryByTestId('change-password-submit-btn'));

		expect(component.queryByTestId('change-password-error')).toBeTruthy();
	});
});

test("new doesn't equal repeated", async () => {
	const component = render(
		<Suspense fallback={<div>Fallback</div>}>
			<Password />
		</Suspense>
	);

	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

	userEvent.type(oldPassword, 'old-password');
	userEvent.type(newPassword, 'new-password');
	userEvent.type(repeatedPassword, 'different-password');

	userEvent.click(component.queryByTestId('change-password-submit-btn'));

	await waitFor(() =>
		expect(component.queryByTestId('change-password-error')).toBeTruthy()
	);
});

test('Password changes successfully', async () => {
	const component = render(
		<Suspense fallback={<div>Fallback</div>}>
			<Password />
		</Suspense>
	);

	// Get the input nodes or whatever they're called.
	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

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

	const component = render(
		<Suspense fallback={<div>Fallback</div>}>
			<Password />
		</Suspense>
	);

	await waitFor(() =>
		expect(component.queryByTestId('password-cant-change')).toBeTruthy()
	);
});
