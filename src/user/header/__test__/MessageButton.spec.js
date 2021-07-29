import React from 'react';
import { act, create } from 'react-test-renderer';

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
			status: null,
		};

		let cmp;
		act(() => {
			cmp = create(
				<MessageButton
					entity={user}
					displayName="TEST USER"
					presence={presence}
				/>
			);
		});

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
		cmp.unmount();
	});

	test('Test present', async () => {
		const user = {
			Username: 'testUser',
		};

		const presence = {
			status: '',
		};

		let cmp;
		act(() => {
			cmp = create(
				<MessageButton
					entity={user}
					displayName="TEST USER"
					presence={presence}
				/>
			);
		});

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
		cmp.unmount();
	});
});
