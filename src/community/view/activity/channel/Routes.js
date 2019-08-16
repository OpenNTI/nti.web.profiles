import {Router, Route} from '@nti/web-routing';
import {encodeForURI} from '@nti/lib-ntiids';

import View from './View';

export default Router.for([
	Route({
		path: '/:topicId?/:commentId?',
		component: View,
		getRouteFor: (obj) => {
			if (obj.isTopic) {
				return `./${encodeForURI(obj.getID())}`;
			}
		}
	})
]);