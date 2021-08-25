import React from 'react';
import { render } from '@testing-library/react';

import * as TestUtils from '@nti/web-client/test-utils';

import MessageButton from '../MessageButton';

const { tearDownTestClient, setupTestClient } = TestUtils;

const getMockService = () => {
	return {};
};

const onBefore = () => {
	jest.useFakeTimers();
	setupTestClient(getMockService());
};

const onAfter = () => {
	tearDownTestClient();
};

/* eslint-env jest */
describe('User profile message button test', () => {
	beforeEach(() => onBefore());
	afterEach(onAfter);

	test('Test not present', async () => {
		const user = {
			Username: 'testUser',
		};

		const presence = {
			isOnline: () => false,
		};

		let cmp = render(
			<MessageButton
				entity={user}
				displayName="TEST USER"
				presence={presence}
			/>
		);

		expect(cmp.asFragment()).toMatchSnapshot();
	});

	test('Test present', async () => {
		const user = {
			Username: 'testUser',
		};

		const presence = {
			isOnline: () => true,
		};

		let cmp = render(
			<MessageButton
				entity={user}
				displayName="TEST USER"
				presence={presence}
			/>
		);

		expect(cmp.asFragment()).toMatchSnapshot();
	});
});
