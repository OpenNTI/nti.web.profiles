import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Input} from '@nti/web-commons';

import Styles from './DateTimeInput.css';

const cx = classnames.bind(Styles);

export default class DateTimeInput extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				name: PropTypes.string,
				title: PropTypes.string,
				description: PropTypes.string
			})
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func
	}


	onChange = (value) => {
		const {onChange, field, value:oldValue} = this.props;

		if (onChange && oldValue !== value) {
			onChange(field, value);
		}
	}

	render () {
		const {field: {schema}, value} = this.props;

		return (
			<div className={cx('.profile-date-time-field')}>
				<Input.Label label={schema.description}>
					<Input.Date
						precision={Input.Date.Precision.month}
						className={cx('profile-date-time-field')}
						value={value}
						onChange={this.onChange}
					/>
				</Input.Label>
			</div>
		);
	}
}