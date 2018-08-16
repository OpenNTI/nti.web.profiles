import {Router, Route} from '@nti/web-routing';

import About from './about/';
import Activity from './activity';
import Achievements from './achievements';
import Memberships from './memberships';
import Transcripts from './transcripts';
import Frame from './Frame';
import {LOCALE_PATH} from './constants';

export const ROUTES = [
	{
		path: '/about',
		component: About,
		name: `${LOCALE_PATH}.about`
	},
	{
		path: '/activity',
		component: Activity,
		name: `${LOCALE_PATH}.activity`
	},
	{
		path: '/achievements',
		component: Achievements,
		name: `${LOCALE_PATH}.achievements`
	},
	{
		path: '/memberships',
		component: Memberships,
		name: `${LOCALE_PATH}.memberships`
	},
	{
		path: '/transcripts',
		component: Transcripts,
		name: `${LOCALE_PATH}.transcripts`
	}
];

const DEFAULT = {
	path: '/',
	component: About,
	name: `${LOCALE_PATH}.root`
};

export default Router.for([...ROUTES, DEFAULT].map(r => Route(r)), {frame: Frame});
