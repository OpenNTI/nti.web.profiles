import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Array as arr } from '@nti/lib-commons';

import Styles from './Styles.css';
import List from './List';

const cx = classnames.bind(Styles);

CommunityActivityChannelList.propTypes = {
	channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	channel: PropTypes.object,
	row: PropTypes.bool,
};
export default function CommunityActivityChannelList({
	channels,
	channel,
	row,
}) {
	const lists = arr.ensure(channels);

	return (
		<div className={cx('community-channel-list', { row, list: !row })}>
			{lists.map(list => {
				return (
					<List
						key={list.getID()}
						list={list}
						activeChannel={channel}
					/>
				);
			})}
		</div>
	);
}
