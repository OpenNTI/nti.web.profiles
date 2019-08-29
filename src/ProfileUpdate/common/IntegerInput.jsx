import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Input} from '@nti/web-commons';

export default class ProfileUpdateIntegerChoice extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				description: PropTypes.string,
				name: PropTypes.string,
				title: PropTypes.string
			})
		}),
		value: PropTypes.number,
		onChange: PropTypes.func
	}


	onChange = (value) => {
		const {field, onChange} = this.props;

		if (onChange) {
			onChange(field, value);
		}
	}

	render () {
		const {field: {schema}, value} = this.props;

		return (
			<div className={cx('profile-update-profile-integer-input', schema.name)}>
				<Input.Label label={schema.description}>
					<Input.Number value={value} step={0} onChange={this.onChange}  placeholder={schema.title} />
				</Input.Label>
			</div>
		);
	}
}
