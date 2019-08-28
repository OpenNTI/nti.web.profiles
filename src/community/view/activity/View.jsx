import {Router, Route} from '@nti/web-routing';
import {encodeForURI} from '@nti/lib-ntiids';

import Frame from './Frame';
import Channel from './channel';
import Channels from './channels';


export default Router.for([
	Route({
		path: '/:channelId',
		component: Channel,
		getRouteFor: (obj) => {
			if (obj.isCommunityChannel) {
				return `./${encodeForURI(obj.getID())}/`;
			}
		}
	}),
	Route({
		path: '/',
		component: Channels
	})
], {frame: Frame});