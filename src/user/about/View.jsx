import {Router, Route} from '@nti/web-routing';

import Read from './Read';
import Edit from './Edit';

const ROUTES = [
	{
		path: '/edit',
		component: Edit
	},
	{
		path: '/',
		component: Read
	}
];

export default Router.for(ROUTES.map(r => Route(r)));
