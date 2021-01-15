import React from 'react';
import {FakeStore} from '@nti/lib-store';

import Panel from '../View';
import Store from '../Store';

export default {
	title: 'Full View',
	component: Panel,
};


export function View ( ) {
	const store = new Store();

	return (
		<FakeStore mock={store}>
			<Panel />
		</FakeStore>
	);
}
