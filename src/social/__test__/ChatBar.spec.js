/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { setupTestClient } from '@nti/web-client/test-utils';

import { ChatBar } from '../ChatBar';

describe('Make sure gutter works', () => {
	beforeEach(() => {
		setupTestClient({
			getContacts() {
				return {
					addListener() {},
				};
			},
		});
	});
	test('Gutter collapses and expands as expected', async () => {
		const view = render(<ChatBar />);

		// view.debug();
		const expandButton = await view.findByTestId('expand-button');

		fireEvent.click(expandButton);

		expect(view.getByTestId('expanded-container')).toBeTruthy();
	});
});
