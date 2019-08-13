import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './Identity.css';

const cx = classnames.bind(Styles);

CommunityIdentity.propTypes = {
	className: PropTypes.string,
	community: PropTypes.shape({
		displayName: PropTypes.string,
		about: PropTypes.string
	})
};
export default function CommunityIdentity ({community, className}) {
	return (
		<div className={cx('community-identity', className)}>
			<Text.Condensed as="div" className={cx('display-name')}>{community.displayName}</Text.Condensed>
			<Text.Base as="div" className={cx('about')}>{community.about}</Text.Base>
		</div>
	);
}