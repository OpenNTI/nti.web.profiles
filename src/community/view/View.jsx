import {Router, Route} from '@nti/web-routing';

import Frame from './Frame';
import Activity from './activity';

export default Router.for([
	Route({
		path: '/',
		component: Activity
	})
], {frame: Frame});
	