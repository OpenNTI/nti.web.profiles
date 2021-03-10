import React from 'react';
import renderer from 'react-test-renderer';

import { TestUtils } from '@nti/web-client';

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

		const cmp = renderer.create(
			<MessageButton
				entity={user}
				displayName="TEST USER"
				presence={presence}
			/>
		);

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Test present', async () => {
		const user = {
			Username: 'testUser',
		};

		const presence = {
			status: '',
		};

		const cmp = renderer.create(
			<MessageButton
				entity={user}
				displayName="TEST USER"
				presence={presence}
			/>
		);

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
