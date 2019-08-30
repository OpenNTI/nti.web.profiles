import {Router, Route} from '@nti/web-routing';
import {encodeForURI} from '@nti/lib-ntiids';

import View from './View';

export default Router.for([
	Route({
		path: '/:topicId?/:commentId?',
		component: View,
		getRouteFor: (obj, context) => {
			const hash = context === 'comment' ? '#comment' : '';

			if (obj.isNewTopic) {
				return './new-topic';
			}

			if (obj.isTopic || (obj.isNote && !obj.inReplyTo)) {
				return `./${encodeForURI(obj.getID())}/${hash}`;
			}

			if (obj.isComment) {
				return `./${encodeForURI(obj.ContainerId)}/#${encodeForURI(obj.getID())}`;
			}

			if (obj.isNote && obj.inReplyTo) {
				return `./${encodeForURI(obj.inReplyTo)}/#${encodeForURI(obj.getID())}`;
			}
		}
	})
]);