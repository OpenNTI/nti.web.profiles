import React from 'react';
import {FakeStore} from '@nti/lib-store';

import Store from '../Store';
import BadgedAvatar from '../BadgedAvatar';

export default {
	title: 'Badged Avatar',
	component: BadgedAvatar,
};


export function Icon () {
	const store = new Store();

	const user = {
		id: 'quiz_tester',
		name: 'Test'
	};

	store.set({
		unreadCount: {
			'quiz_tester': 5,
		},
	});

	return (
		<FakeStore mock={store}>
			<BadgedAvatar entity={user}/>
		</FakeStore>
	);
}
