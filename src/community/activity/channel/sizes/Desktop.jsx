import React from 'react';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';

import Sidebar from '../../components/Sidebar';

import Styles from './Desktop.css';
import propTypes from './prop-types';

const cx = classnames.bind(Styles);
const {Aside} = Layouts;

ChannelDesktopLayout.propTypes = propTypes;
export default function ChannelDesktopLayout ({community, channels, channel}) {
	return (
		<Aside.Container className={cx('community-desktop')} asideClassname={cx('community-desktop-sidebar')}>
			<Aside side="left" component={Sidebar} community={community} channels={channels} channel={channel} />
			<div>
				Community Desktop Body
			</div>
		</Aside.Container>
	);
}