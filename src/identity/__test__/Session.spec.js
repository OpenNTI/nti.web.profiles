/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { setupTestClient } from '@nti/web-client/test-utils';

import { Session } from '../Session.jsx';

beforeEach(() => {
	setupTestClient(
		{
			capabilities: {
				canChat: true,
				canImpersonate: true,
			},
			getAppUserSync() {
				return {
					Username: 'Tester',
					getLink(rel) {
						return rel;
					},
				};
			},
			async getAppUser() {
				return this.getAppUserSync();
			},
			async resolveEntity() {
				return this.getAppUserSync();
			},
			getSupportLinks() {
				return {
					about: 'about',
					privacyPolicy: 'privacyPolicy',
					termsOfService: 'termsOfService',
					support: 'support',
					help: 'help',
				};
			},
			getUserPreferences() {
				return {
					addListener() {},
					removeListener() {},
					get() {},
					waitForPending() {},
				};
			},
		},
		'Tester'
	);
});

test('Test IDs Exist', async () => {
	const view = render(<Session />);
	const trigger = await view.findByTestId('identity');
	fireEvent.click(trigger);

	await view.findAllByRole('menu');

	await view.findAllByTestId('Available');
	await view.findAllByTestId('Away');
	await view.findAllByTestId('Do Not Disturb');
	await view.findAllByTestId('Offline');

	await view.findAllByTestId('welcomeGuide');
	await view.findAllByTestId('about');
	await view.findAllByTestId('privacyForMinors');
	await view.findAllByTestId('privacy');
	await view.findAllByTestId('terms');
	await view.findAllByTestId('support');
	await view.findAllByTestId('helpSite');
	await view.findAllByTestId('impersonate-button');
	await view.findAllByTestId('logout-button');
});
