import React from 'react';

import { Layouts } from '@nti/web-commons';

import Sidebar from '../../components/Sidebar';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelDescription from '../../components/ChannelDescription';
import ChannelStream from '../../components/ChannelStream';
import ChannelNotFound from '../../components/ChannelNotFound';

import styles from './Desktop.css';
import propTypes from './prop-types';

const { Aside } = Layouts;

const BatchSize = 20;

ChannelDesktopLayout.propTypes = propTypes;
export default function ChannelDesktopLayout(props) {
	const {
		community,
		channels,
		channel,
		notFound,
		layout,
		setLayout,
		availableSorts,
		sortOn,
		setSortOn,
		title,
	} = props;

	return (
		<Aside.Container
			className={styles.communityDesktop}
			asideClassName={styles.communityDesktopSidebar}
		>
			<Aside
				side="left"
				component={Sidebar}
				community={community}
				channels={channels}
				channel={channel}
				title={title}
				showJoin
			/>
			<div className={styles.communityDesktopBody}>
				{notFound && <ChannelNotFound {...props} />}
				{channel && (
					<ChannelStreamHeader
						channel={channel}
						availableSorts={availableSorts}
						layout={layout}
						sortOn={sortOn}
						setLayout={setLayout}
						setSortOn={setSortOn}
					/>
				)}
				{channel && <ChannelDescription channel={channel} />}
				{channel && (
					<ChannelStream
						searchContext={community.getID()}
						channel={channel}
						sortOn={sortOn}
						layout={layout}
						batchSize={BatchSize}
						columns={2}
					/>
				)}
			</div>
		</Aside.Container>
	);
}
