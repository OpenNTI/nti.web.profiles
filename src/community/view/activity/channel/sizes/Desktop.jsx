import React from 'react';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';

import Sidebar from '../../components/Sidebar';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelDescription from '../../components/ChannelDescription';
import ChannelStream from '../../components/ChannelStream';

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
		sortOn,
		setSortOn
	} = props;

	return (
		<Aside.Container className={cx('community-desktop')} asideClassname={cx('community-desktop-sidebar')}>
			<Aside side="left" component={Sidebar} community={community} channels={channels} channel={channel} />
			<div className={cx('community-desktop-body')}>
				<ChannelStreamHeader
					channel={channel}
					availableSorts={availableSorts}
					layout={layout}
					sortOn={sortOn}
					setLayout={setLayout}
					setSortOn={setSortOn}
				/>
				<ChannelDescription channel={channel} />				
				{channel && (
					<ChannelStream
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