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

// test('old equals new', async () => {
// 	const component = render(<Password />);

// 	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

// 	const samePassword = 'password';

// 	fireEvent.change(oldPassword, { target: { value: samePassword } });
// 	fireEvent.change(newPassword, { target: { value: samePassword } });
// 	fireEvent.change(repeatedPassword, { target: { value: samePassword } });

// 	await waitFor(() => fireEvent.submit(component.queryByTestId('form')));

// 	await waitFor(() => expect(component.queryByTestId('error')).toBeTruthy());
// });

// test("new doesn't equal repeated", async () => {
// 	const component = render(<Password />);

// 	const { oldPassword, newPassword, repeatedPassword } = getInputs(component);

// 	fireEvent.change(oldPassword, { target: { value: 'old-password' } });
// 	fireEvent.change(newPassword, { target: { value: 'new-password' } });
// 	fireEvent.change(repeatedPassword, {
// 		target: { value: 'different-password' },
// 	});

// 	await waitFor(() => fireEvent.submit(component.queryByTestId('form')));

// 	await waitFor(() => expect(component.queryByTestId('error')).toBeTruthy());
// });

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
