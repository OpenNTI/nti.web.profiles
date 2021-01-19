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

	return (
		<FakeStore mock={store}>
			<View />
		</FakeStore>
	);
}
