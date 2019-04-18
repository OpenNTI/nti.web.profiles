import {Router, Route} from '@nti/web-routing';

import About from './about/';
import Activity from './activity';
import Achievements from './achievements';
import Edit from './edit';
import Memberships from './memberships';
import Transcripts from './transcripts';
import Frame from './Frame';
import {LOCALE_PATHS} from './constants';

const ROUTES = [
	{
		path: '/about/edit',
		component: Edit,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'edit') {
				return '/about/edit';
			}
			return null;
		}
	},
	{
		path: '/about',
		component: About,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'about') {
				return '/about';
			}
			return null;
		},
		visible: true // renders in the nav
	},
	{
		path: '/activity',
		component: Activity,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'activity') {
				return '/activity';
			}
			return null;
		},
		visible: true
	},
	{
		path: '/achievements',
		component: Achievements,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'achievements') {
				return '/achievements';
			}
			return null;
		},
		applicable: entity => entity && (entity.hasLink('Badges') || entity.hasLink('Certificate')),
		visible: true
	},
	{
		path: '/memberships',
		component: Memberships,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'memberships') {
				return '/memberships';
			}
			return null;
		},
		visible: true
	},
	{
		path: '/transcripts',
		component: Transcripts,
		getRouteFor: (obj, context) => {
			if (obj && obj.isUser && context === 'transcripts') {
				return '/transcripts';
			}
			return null;
		},
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
