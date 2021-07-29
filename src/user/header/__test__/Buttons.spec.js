import React from 'react';
import { act, create } from 'react-test-renderer';

import * as TestUtils from '@nti/web-client/test-utils';
import { flushPromises } from '@nti/lib-commons/test-utils';

import Buttons from '../Buttons';

const { tearDownTestClient, setupTestClient } = TestUtils;

const getMockService = () => {
	return {
		getContacts: () => {
			return {
				addListener: () => {},
				removeListener: () => {},
				contains: () => true,
			};
		},
	};
};

const onBefore = () => {
	jest.useFakeTimers();
	setupTestClient(getMockService());
	global.$AppConfig = {
		...global.$AppConfig,
		username: 'testUser',
	};
};

const onAfter = () => {
	tearDownTestClient();
	delete global.$AppConfig.username;
};

/* eslint-env jest */
describe('User profile header buttons test', () => {
	beforeEach(() => {
		onBefore();
	});

	afterEach(() => {
		onAfter();
	});

	test('Is not acting user', async () => {
		const user = {
			getID: () => 'NOTtestUser',
		};

		let cmp;
		await act(async () => {
			cmp = create(<Buttons entity={user} />);
			jest.runAllTimers();
			await flushPromises();
			jest.runAllTimers();
		});

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
		cmp.unmount();
	});
});
