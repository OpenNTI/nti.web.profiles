import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

Card.propTypes = {
	className: PropTypes.string
};

export default function Card ({className, ...props}) {
	return (
		<div className={cx('user-profile-card', className)} {...props} />
	);
}
