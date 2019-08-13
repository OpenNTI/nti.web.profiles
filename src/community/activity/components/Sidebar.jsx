import React from 'react';
import classnames from 'classnames/bind';

import Styles from './Sidebar.css';
import ChannelList from './channel-list';
import Identity from './Identity';

const cx = classnames.bind(Styles);

export default function CommunitySidebar (props) {
	return (
		<div className={cx('community-sidebar')}>
			<Identity {...props} className={cx('side-bar-identity')} />
			<ChannelList {...props} className={cx('side-bar-channel-list')} />
		</div>
	);
}