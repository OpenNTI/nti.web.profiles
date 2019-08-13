import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './Styles.css';
import Item from './Item';

const cx = classnames.bind(Styles);

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
		<div className={cx('channel-list')}>
			{label && (
				<Text.Base as="div" className={cx('channel-header')}>
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