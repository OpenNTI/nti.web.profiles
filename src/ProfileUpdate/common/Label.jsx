import './Label.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import cx from 'classnames';


ProfileUpdateLabel.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	index: PropTypes.number
};
export default function ProfileUpdateLabel ({className, label, index, ...otherProps}) {
	return (
		<Input.Label
			className={cx('profile-update-label', className, {first: index === 0})}
			label={label}
			{...otherProps}
		/>
	);
}
