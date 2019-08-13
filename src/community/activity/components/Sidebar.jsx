import React from 'react';

import ChannelList from './channel-list';
import Identity from './Identity';

export default function CommunitySidebar (props) {
	return (
		<div>
			<Identity {...props} />
			<ChannelList {...props} />
		</div>
	);
}