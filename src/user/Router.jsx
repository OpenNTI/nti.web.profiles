import {Router, Route} from '@nti/web-routing';

import {default as About, Edit} from './about/';
import Activity from './activity';
import Achievements from './achievements';
import Memberships from './memberships';
import Transcripts from './transcripts';
import Frame from './Frame';
import {LOCALE_PATHS} from './constants';

const ROUTES = [
	{
		path: '/about/edit',
		component: Edit,
		name: `${LOCALE_PATHS.EDIT}`
	},
	{
		path: '/about',
		component: About,
		name: `${LOCALE_PATHS.NAV}.about`,
		visible: true // renders in the nav
	},
	{
		path: '/activity',
		component: Activity,
		name: `${LOCALE_PATHS.NAV}.activity`,
		visible: true
	},
	{
		path: '/achievements',
		component: Achievements,
		name: `${LOCALE_PATHS.NAV}.achievements`,
		visible: true
	},
	{
		path: '/memberships',
		component: Memberships,
		name: `${LOCALE_PATHS.NAV}.memberships`,
		visible: true
	},
	{
		path: '/transcripts',
		component: Transcripts,
		name: `${LOCALE_PATHS.NAV}.transcripts`,
		visible: true,
		applicable: entity => entity && entity.hasLink('transcript')
	},
	{
		path: '/',
		component: About,
		name: `${LOCALE_PATHS}.root`
	}
];

export function getRoutes (entity) {
	const applicable = r => !r.applicable || r.applicable(entity);
	return ROUTES.filter(applicable);
}

export default function routerFor (entity) {
	return Router.for(
		getRoutes(entity)
			.map(r => Route(r)),
		{frame: Frame}
	);
}
