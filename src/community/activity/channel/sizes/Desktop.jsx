import React from 'react';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';

import Sidebar from '../../components/Sidebar';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelStream from '../../components/ChannelStream';

import Styles from './Desktop.css';
import propTypes from './prop-types';

const cx = classnames.bind(Styles);
const {Aside} = Layouts;

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
		setSort
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
				{channel && <ChannelStream channel={channel} sort={sort} layout={layout} />}
			</div>
		</Aside.Container>
	);
}