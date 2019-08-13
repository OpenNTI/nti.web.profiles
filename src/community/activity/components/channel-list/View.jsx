import React from 'react';
import PropTypes from 'prop-types';
import {Array as arr} from '@nti/lib-commons';

import List from './List';

CommunityActivityChannelList.propTypes = {
	channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	channel: PropTypes.object
};
export default function CommunityActivityChannelList ({channels, channel}) {
	const lists = arr.ensure(channels);

	return (
		<div>
			{lists.map((list) => {
				return (
					<List key={list.getID()} list={list} activeChannel={channel} />
				);
			})}
		</div>
	);
}