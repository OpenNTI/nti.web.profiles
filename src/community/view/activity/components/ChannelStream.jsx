import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Stream } from '@nti/web-discussions';
import { EmptyState } from '@nti/web-commons';

import Styles from './ChannelStream.css';
import Card from './Card';
import { getGrouperForSort } from './Groupers';

const cx = classnames.bind(Styles);
const t = scoped('nti-profile.community.activity.components.ChannelStream', {
	empty: 'There are no active discussions. Be the first to start one.',
});

const renderEmpty = () => (
	<Card className={cx('channel-stream-empty')}>
		<EmptyState header={t('empty')} />
	</Card>
);

const SortOrders = {
	createdTime: 'descending',
	NewestDescendantCreatedTime: 'descending',
	PostCount: 'descending',
	LikeCount: 'descending',
};

ChannelStream.propTypes = {
	channel: PropTypes.object,
	sortOn: PropTypes.string,
	layout: PropTypes.string,
	columns: PropTypes.number,
	batchSize: PropTypes.number,
	searchContext: PropTypes.string,
};
export default function ChannelStream({
	channel,
	sortOn,
	layout,
	batchSize,
	columns,
	searchContext,
}) {
	const grouperProps = getGrouperForSort(sortOn);

	return (
		<Stream.Body
			context={channel}
			sortOn={sortOn}
			sortOrder={SortOrders[sortOn]}
			layout={layout}
			renderEmpty={renderEmpty}
			columns={columns}
			batchSize={batchSize}
			searchContext={searchContext}
			{...grouperProps}
		/>
	);
}
