import React from 'react';
import classnames from 'classnames/bind';

import {MembersPreview} from '../../../common';

import Styles from './Sidebar.css';
import Card from './Card';
import ChannelList from './channel-list';
import Identity from './Identity';

const cx = classnames.bind(Styles);

export default function CommunitySidebar (props) {
	return (
		<Card className={cx('community-sidebar')}>
			<Identity {...props} className={cx('side-bar-identity')} />
			<div className={cx('side-bar-members')}>
				<MembersPreview.InlineList {...props} max={9} />
			</div>
			<ChannelList {...props} className={cx('side-bar-channel-list')} />
		</Card>
	);
}