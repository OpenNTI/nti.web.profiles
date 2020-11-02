import React from 'react';
import renderer from 'react-test-renderer';
import { TestUtils } from '@nti/web-client';

import Buttons from '../Buttons';

const { tearDownTestClient, setupTestClient } = TestUtils;

const getMockService = () => {
	return {
		getContacts: () => {
			return {
				addListener: () => {},
				removeListener: () => {},
				contains: () => true
			};
		}
	};
};

const onBefore = () => {
	jest.useFakeTimers();
	setupTestClient(getMockService());
	global.$AppConfig = {
		...(global.$AppConfig),
		username: 'testUser'
	};
};

const onAfter = () => {
	tearDownTestClient();
	delete global.$AppConfig.username;
};

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

/* eslint-env jest */
describe ('User profile header buttons test', () => {
	beforeEach(() => {
		onBefore();
	});

	afterEach(() => {
		onAfter();
	});

	test ('Is not acting user', async () => {
		const user = {
			getID: () => 'NOTtestUser'
		};

		const cmp = renderer.create(<Buttons entity={user}/>);

		jest.runAllTimers();
		await flushPromises();
		jest.runAllTimers();

		const tree = cmp.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
