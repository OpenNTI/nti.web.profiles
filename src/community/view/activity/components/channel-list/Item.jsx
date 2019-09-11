import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';
import {Text} from '@nti/web-commons';
import {Launch} from '@nti/web-reports';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

ChannelListItem.propTypes = {
	channel: PropTypes.shape({
		title: PropTypes.string,
		isAllActivityChannel: PropTypes.bool,
		Reports: PropTypes.array
	}),
	active: PropTypes.bool
};
export default function ChannelListItem ({channel, active}) {
	return (
		<LinkTo.Object object={channel} className={cx('channel', {active})} title={channel.title} noPathFix >
			<Text.Base className={cx('channel-label')}>
				{channel.title}
			</Text.Base>
			<Launch.Button report={channel.Reports && channel.Reports[0]} className={cx('channel-report')} />
		</LinkTo.Object>
	);
}