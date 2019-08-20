import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.activity.components.channel-list.Item', {
	allActivity: 'All Activity'
});

ChannelListItem.propTypes = {
	channel: PropTypes.shape({
		title: PropTypes.string,
		isAllActivityChannel: PropTypes.bool
	}),
	active: PropTypes.bool
};
export default function ChannelListItem ({channel, active}) {
	return (
		<LinkTo.Object object={channel} className={cx('channel', {active})} data-title={channel.title}>
			{channel.isAllActivityChannel ? t('allActivity') : channel.title}
		</LinkTo.Object>
	);
}