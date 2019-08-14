import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Stream} from '@nti/web-discussions';
import {EmptyState} from '@nti/web-commons';

import Styles from './ChannelStream.css';
import  Card from './Card';

const cx = classnames.bind(Styles);
const t = scoped('nti-profile.community.activity.components.ChannelStream', {
	empty: 'There are no active discussions. Be the first to start one.'
});

const renderEmpty = () => (<Card className={cx('channel-stream-empty')}><EmptyState header={t('empty')} /></Card>);

ChannelStream.propTypes = {
	channel: PropTypes.object,
	sort: PropTypes.string,
	layout: PropTypes.string,
	columns: PropTypes.number,
	batchSize: PropTypes.number
};
export default function ChannelStream ({channel, sort, layout, batchSize, columns}) {
	return (
		<Stream.Body
			context={channel}
			sort={sort}
			layout={layout}
			renderEmpty={renderEmpty}
			columns={columns}
			batchSize={batchSize}
		/>
	);
}