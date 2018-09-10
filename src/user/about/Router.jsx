import {Router, Route} from '@nti/web-routing';

import Frame from './Frame';
import Read from './Read';
import Edit from './Edit';

const ROUTES = [
	{
		path: '/edit',
		component: Edit,
		applicable: entity => entity && entity.isModifiable
	},
	{
		path: '/',
		component: Read
	}
];


function getRoutes (entity) {
	const applicable = r => !r.applicable || r.applicable(entity);
	return ROUTES.filter(applicable);
}

export default function routerFor (entity) {
	return Router.for(getRoutes(entity).map(r => Route(r)), {frame: Frame});
}
