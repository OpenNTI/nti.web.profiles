import { useState, useCallback } from 'react';

import { User } from '@nti/web-commons';

import ContactEntry from '../ContactEntry';

User.Presence.Store.setPresence('quiz_tester', {
	status: 'available',
	show: 'chat',
	getName() {
		return this.status;
	},
	isOnline: () => true,
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

export default {
	title: 'Contact Entry',
	component: ContactEntry,
};

export function Example() {
	const [selected, toggleSel] = useToggle();
	const [expanded, toggleExp] = useToggle();
	return (
		<>
			<ContactEntry
				expanded={expanded}
				selected={selected}
				onClick={toggleSel}
				entity={user}
			/>
			<button onClick={toggleExp}>exp</button>
		</>
	);
}

function useToggle() {
	const [x, set] = useState();
	const toggle = useCallback(() => set(_ => !_), [set]);
	return [x, toggle];
}
