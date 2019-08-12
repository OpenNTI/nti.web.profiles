import {Router, Route} from '@nti/web-routing';

import Frame from './Frame';
import Channel from './channel';
import Channels from './channels';

export default Router.for([
	Route({
		path: '/:channelId',
		component: Channel
	}),
	Route({
		path: '/',
		component: Channels
	})
], {frame: Frame});