import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Input} from '@nti/web-commons';

import Styles from './DateTime.css';

const cx = classnames.bind(Styles);

export default class DateTimeInput extends React.PureComponent {
	static handles = ({type}) => type === 'datetime'

	static propTypes = {
		className: PropTypes.string,
	}

	render () {
		const {className, ...otherProps} = this.props;

		return (
			<Input.Date
				precision={Input.Date.Precision.month}
				className={cx('profile-date-time-field', className)}
				{...otherProps}
			/>
		);
	}
}