/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { setupTestClient as useMockServer } from '@nti/web-client/test-utils';

import { ChatBar } from '../ChatBar';

describe('Make sure gutter works', () => {
	beforeEach(() => {
		useMockServer({
			getContacts() {
				return {
					addListener() {},
				};
			},
		});
	});
	test('Gutter collapses and expands as expected', () => {
		const view = render(<ChatBar />);

		const expandButton = view.getByTestId('expand-button');

		fireEvent.click(expandButton);

		expect(view.getByTestId('expanded-container')).toBeTruthy();
	});
});
