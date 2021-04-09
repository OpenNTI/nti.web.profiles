import React from 'react';

import { User } from '@nti/web-commons';

import ContactEntry from '../BadgedAvatar';

// function ContactEntry() { return null; }

export default {
	title: 'Contact Entry',
	component: ContactEntry,
};

export function Example() {
	User.Presence.Store.setPresenceFor('quiz_tester', {
		status: 'available',
		show: 'chat',
		getName() {
			return this.status;
		},
	});

	const user = {
		getID() {
			return this.Username;
		},
		Username: 'quiz_tester',
		displayName: 'Tester',
		initials: 'QT',
		avatarURL: null,
	};

	return <ContactEntry entity={user} />;
}
