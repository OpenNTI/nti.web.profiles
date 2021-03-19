/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import View from '../View';

describe('Make sure gutter works', () => {
	test('Gutter collapses and expands as expected', () => {
		const view = render(<View />);

		const expandButton = view.getByTestId('expand-button');

		fireEvent.click(expandButton);

		expect(view.getByTestId('expanded-container')).toBeTruthy();
	});
});
