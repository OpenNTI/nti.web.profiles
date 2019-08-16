import React from 'react';
import classnames from 'classnames/bind';
import {Layouts, Prompt} from '@nti/web-commons';

import Sidebar from '../../components/Sidebar';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelStream from '../../components/ChannelStream';
import Topic from '../../topic';

import Styles from './Desktop.css';
import propTypes from './prop-types';

const cx = classnames.bind(Styles);
const {Aside} = Layouts;

const BatchSize = 20;

ChannelDesktopLayout.propTypes = propTypes;
export default function ChannelDesktopLayout (props) {
	const {
		community,
		channels,
		channel,
		layout,
		setLayout,
		availableSorts,
		sort,
		setSort,
		topicId,
		commentId,
		...otherProps
	} = props;

	return (
		<Aside.Container className={cx('community-desktop')} asideClassname={cx('community-desktop-sidebar')}>
			<Aside side="left" component={Sidebar} community={community} channels={channels} channel={channel} />
			<div className={cx('community-desktop-body')}>
				<ChannelStreamHeader
					channel={channel}
					availableSorts={availableSorts}
					layout={layout}
					sort={sort}
					setLayout={setLayout}
					setSort={setSort}
				/>
				{channel && (
					<ChannelStream
						channel={channel}
						sort={sort}
						layout={layout}
						batchSize={BatchSize}
						columns={2}
					/>
				)}
				{topicId && channel && (
					<Prompt.Dialog className="community-topic-dialog">
						<Topic
							channel={channel}
							topicId={topicId}
							commentId={commentId}
							{...otherProps}
						/>
					</Prompt.Dialog>
				)}
			</div>
		</Aside.Container>
	);
}