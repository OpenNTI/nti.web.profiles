import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Card from '../Card';

import Styles from './Styles.css';
import Layout from './Layout';
import NewPost from './NewPost';
import Sort from './Sort';

const cx = classnames.bind(Styles);

CommunityChannelStreamHeader.propTypes = {
	className: PropTypes.string
};
export default function CommunityChannelStreamHeader (props) {
	return (
		<Card className={cx('community-channel-stream-header', props.className)}>
			<NewPost {...props} />
			<Sort {...props} />
			<Layout {...props} />
		</Card>
	);
}