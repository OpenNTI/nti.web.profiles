import React from 'react';
import renderer from 'react-test-renderer';

import * as TestUtils from '@nti/web-client/test-utils';
import { flushPromises } from '@nti/lib-commons/test-utils';

import ManageControls from '../ManageControls';

const { tearDownTestClient, setupTestClient } = TestUtils;

const getMockService = isContact => {
	return {
		getContacts: () => {
			return {
				addListener: () => {},
				removeListener: () => {},
				contains: () => isContact,
			};
		},
	};
};

const onBefore = isContact => {
	jest.useFakeTimers();
	setupTestClient(getMockService(isContact));
};

const onAfter = () => {
	tearDownTestClient();
};

/* eslint-env jest */
describe('User profile manage controls test (is not a contact)', () => {
	beforeEach(() => onBefore(false));
	afterEach(onAfter);

	test('Basic render test', async () => {
		const user = {
			Username: 'testUser',
			getID: () => 'testUser',
		};

		const cmp = renderer.create(<ManageControls entity={user} />);

		jest.runAllTimers();
		await flushPromises();
		jest.runAllTimers();

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('User profile manage controls test (is a contact)', () => {
	beforeEach(() => onBefore(true));
	afterEach(onAfter);

	test('Basic render test', async () => {
		const user = {
			Username: 'testUser',
			getID: () => 'testUser',
		};

		const cmp = renderer.create(<ManageControls entity={user} />);

		jest.runAllTimers();
		await flushPromises();
		jest.runAllTimers();

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
