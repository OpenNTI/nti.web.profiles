import {Router, Route} from '@nti/web-routing';

import About from './about/';
import Activity from './activity';
import Achievements from './achievements';
import Memberships from './memberships';
import Transcripts from './transcripts';
import Frame from './Frame';
import {LOCALE_PATHS} from './constants';

const ROUTES = [
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
		name: `${LOCALE_PATHS.NAV}.transcripts`,
		applicable: entity => entity && entity.hasLink('transcript')
	}
];

const DEFAULT = {
	path: '/',
	component: About,
	name: `${LOCALE_PATHS}.root`
};

export function getRoutes (entity) {
	const applicable = r => !r.applicable || r.applicable(entity);
	return ROUTES.filter(applicable);
}

export default function routerFor (entity) {
	return Router.for([...getRoutes(entity), DEFAULT].map(r => Route(r)), {frame: Frame});
}
