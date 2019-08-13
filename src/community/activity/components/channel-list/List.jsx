import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '@nti/web-commons';

import Item from './Item';

ChannelList.propTypes = {
	list: PropTypes.shape({
		label: PropTypes.string,
		channels: PropTypes.array
	}).isRequired,
	activeChannel: PropTypes.object
};
export default function ChannelList ({list, activeChannel}) {
	const {label, channels} = list;

	return (
		<div>
			{label && (
				<Text.Base as="div">
					{label}
				</Text.Base>
			)}
			<ul>
				{channels.map((channel) => {
					return (
						<li key={channel.getID()}>
							<Item channel={channel} active={activeChannel.getID() === channel.getID()} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}