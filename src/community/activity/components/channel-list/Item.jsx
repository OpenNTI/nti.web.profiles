import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';

ChannelListItem.propTypes = {
	channel: PropTypes.shape({
		title: PropTypes.string
	}),
	active: PropTypes.bool
};
export default function ChannelListItem ({channel}) {
	return (
		<LinkTo.Object object={channel}>
			{channel.title}
		</LinkTo.Object>
	);
}