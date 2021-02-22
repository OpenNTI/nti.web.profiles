import './Card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Layouts } from '@nti/web-commons';

const { Responsive } = Layouts;

const ClassList = [{ query: ({ width }) => width < 500, className: 'small' }];

Card.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.any,
};
export default function Card({ className, title, children, ...props }) {
	return (
		<Responsive.ClassList
			className={cx('user-profile-card', className)}
			classList={ClassList}
		>
			{title && <h2>{title}</h2>}
			{children}
		</Responsive.ClassList>
	);
}
