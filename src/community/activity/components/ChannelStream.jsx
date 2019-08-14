import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Stream} from '@nti/web-discussions';
import {EmptyState} from '@nti/web-commons';

import  Card from './Card';

const t = scoped('nti-profile.community.activity.components.ChannelStream', {
	empty: 'There are no active discussions. Be the first to start one.'
});

const renderEmpty = () => (<Card><EmptyState header={t('empty')} /></Card>);

ChannelStream.propTypes = {
	channel: PropTypes.object,
	sort: PropTypes.string,
	layout: PropTypes.string
};
export default function ChannelStream ({channel, sort, layout}) {
	return (
		<Stream.Body context={channel} sort={sort} layout={layout} renderEmpty={renderEmpty} />
	);
}