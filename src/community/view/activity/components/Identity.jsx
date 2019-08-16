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
	}),
	showOptions: PropTypes.func
};
export default function CommunityIdentity ({community, className, showOptions}) {
	return (
		<div className={cx('community-identity', className)}>
			<div className={cx('title')}>
				<Text.Condensed as="div" className={cx('display-name')}>
					{community.displayName}
				</Text.Condensed>
				{showOptions && (
					<span className={cx('show-options')} onClick={showOptions} >...</span>
				)}
			</div>
			<Text.Base as="div" className={cx('about')}>{community.about}</Text.Base>
		</div>
	);
}