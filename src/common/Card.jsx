import './Card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

Card.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.any
};

export default function Card ({className, title, children, ...props}) {
	return (
		<section className={cx('user-profile-card', className)}>
			{title && <h2>{title}</h2>}
			{children}
		</section>
	);
}
