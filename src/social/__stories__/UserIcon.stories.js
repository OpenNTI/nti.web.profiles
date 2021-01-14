import React from 'react';
import { action } from '@storybook/addon-actions';
import {FakeStore} from '@nti/lib-store';

import Store from '../Store';
import UserIcon from '../UserIcon';

export default {
	title: 'User Icon',
	component: UserIcon,
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
			<UserIcon user={user}/>
		</FakeStore>
	);
}
