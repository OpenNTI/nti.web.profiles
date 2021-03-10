import './Label.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Input } from '@nti/web-commons';

ProfileUpdateLabel.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	index: PropTypes.number,
};
export default function ProfileUpdateLabel({
	className,
	label,
	index,
	...otherProps
}) {
	return (
		<Input.Label
			className={cx('profile-update-label', className, {
				first: index === 0,
			})}
			label={label}
			{...otherProps}
		/>
	);
}
