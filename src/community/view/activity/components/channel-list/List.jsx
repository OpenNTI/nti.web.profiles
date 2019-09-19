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
	const activeId = activeChannel && activeChannel.getID();

	const {pinned, sortable} = channels.reduce((acc, channel) => {
		if (channel.pinned) {
			acc.pinned.push(channel);
		} else {
			acc.sortable.push(channel);
		}

		return acc;
	}, {pinned: [], sortable: []});
	
	const renderChannel = (channel) => {
		return (
			<li key={channel.getID()}>
				<Item channel={channel} active={activeId === channel.getID()} />
			</li>
		);
	};

	return (
		<div className={cx('channel-list', {'has-label': !!label})}>
			{label && (
				<Text.Base as="div" className={cx('channel-header')}>
					{label}
				</Text.Base>
			)}
			<ul>
				{pinned.map(renderChannel)}
				{sortable.map(renderChannel)}
			</ul>
		</div>
	);
}