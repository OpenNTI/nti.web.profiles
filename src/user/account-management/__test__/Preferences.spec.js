/* eslint-env jest */
import { render } from '@testing-library/react';

import { User } from '@nti/web-commons';

import { Field } from '../tabs/preferences/Field';

const mock = jest.fn();

jest.mock('@nti/web-commons', () => ({
	Checkbox: jest.requireActual('@nti/web-commons').Checkbox,
	User: {
		...jest.requireActual('@nti/web-commons').User,
		usePreference: jest.fn(),
	},
}));

jest.mock('@nti/web-client', () => ({
	getConfig: jest.fn().mockImplementation(path => 'config' + path),
}));

test('Field component', async () => {
	User.usePreference.mockReturnValue([true, mock]);

	const component = render(
		<Field
			name="useHighContrast"
			collection="WebApp"
			label="useHighContrast"
		/>
	);

	expect(
		component.getByTestId('checkbox-useHighContrast').querySelector('input')
	).toBeChecked();

	User.usePreference.mockReturnValue([false, mock]);

	component.rerender(
		<Field
			name="useHighContrast"
			collection="WebApp"
			label="useHighContrast"
		/>
	);

	expect(
		component.getByTestId('checkbox-useHighContrast').querySelector('input')
	).not.toBeChecked();
});
