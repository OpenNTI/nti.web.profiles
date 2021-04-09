/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { ChatBar } from '../ChatBar';

function useMockServer(mockService) {
	global.$AppConfig = {
		...global.$AppConfig,
		nodeService: mockService,
		nodeInterface: {
			async getServiceDocument() {
				return mockService;
			},
		},
	};
}

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
