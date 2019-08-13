import React from 'react';
import classnames from 'classnames/bind';

import Card from '../Card';

import Styles from './Styles.css';
import Layout from './Layout';
import NewPost from './NewPost';
import Sort from './Sort';

const cx = classnames.bind(Styles);

export default function CommunityChannelStreamHeader (props) {
	return (
		<Card className={cx('community-channel-stream-header')}>
			<NewPost {...props} />
			<Sort {...props} />
			<Layout {...props} />
		</Card>
	);
}