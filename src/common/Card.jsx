import './Card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { scoped } from '@nti/lib-locale';
import { Layouts, Tooltip } from '@nti/web-commons';
import { Text, Icons } from '@nti/web-core';

const t = scoped('nti-profiles.common.Card', {
	private: {
		label: 'Private',
		tooltip: 'Visible to You and Admins',
	},
});

const { Responsive } = Layouts;

const ClassList = [{ query: ({ width }) => width < 500, className: 'small' }];

Card.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.any,
	private: PropTypes.bool,
};
export default function Card({
	className,
	title,
	private: privateProp,
	children,
	...props
}) {
	return (
		<Responsive.ClassList
			className={cx('user-profile-card', className)}
			classList={ClassList}
		>
			<div className={cx('user-profile-card-header')}>
				{title && <h2>{title}</h2>}
				{privateProp && (
					<Tooltip label={t('private.tooltip')}>
						<div>
							<Text
								className={cx('user-profile-card-private-pill')}
							>
								<Icons.Eye />
								<span>{t('private.label')}</span>
							</Text>
						</div>
					</Tooltip>
				)}
			</div>
			{children}
		</Responsive.ClassList>
	);
}
