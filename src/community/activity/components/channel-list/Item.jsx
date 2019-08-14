import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

ChannelListItem.propTypes = {
	channel: PropTypes.shape({
		title: PropTypes.string
	}),
	active: PropTypes.bool
};
export default function ChannelListItem ({channel, active}) {
	return (
		<LinkTo.Object object={channel} className={cx('channel', {active})} data-title={channel.title}>
			{channel.title}
		</LinkTo.Object>
	);
}