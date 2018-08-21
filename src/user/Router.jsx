import {Router, Route} from '@nti/web-routing';

import About from './about/';
import Activity from './activity';
import Achievements from './achievements';
import Memberships from './memberships';
import Transcripts from './transcripts';
import Frame from './Frame';
import {LOCALE_PATHS} from './constants';

export const ROUTES = [
	{
		path: '/about',
		component: About,
		name: `${LOCALE_PATHS.NAV}.about`
	},
	{
		path: '/activity',
		component: Activity,
		name: `${LOCALE_PATHS.NAV}.activity`
	},
	{
		path: '/achievements',
		component: Achievements,
		name: `${LOCALE_PATHS.NAV}.achievements`
	},
	{
		path: '/memberships',
		component: Memberships,
		name: `${LOCALE_PATHS.NAV}.memberships`
	},
	{
		path: '/transcripts',
		component: Transcripts,
		name: `${LOCALE_PATHS.NAV}.transcripts`
	}
];

const DEFAULT = {
	path: '/',
	component: About,
	name: `${LOCALE_PATHS}.root`
};

export default Router.for([...ROUTES, DEFAULT].map(r => Route(r)), {frame: Frame});
