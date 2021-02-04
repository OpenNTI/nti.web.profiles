import React from 'react';
import {FakeStore} from '@nti/lib-store';

import View from '../View';
import Store from '../Store';

export default {
	title: 'Full View',
	component: View,
};


export function Panel ( ) {
	const store = new Store();

	store.set({
		activeUsers: {
			user1: 'available',
			user2: 'dnd',
			user3: 'away',
		}
	});

	store.set({
		unreadCount: {
			user1: 1,
			user2: 10,
			user3: 20,
		},
	});

	return (
		<FakeStore mock={store}>
			<View />
		</FakeStore>
	);
}
