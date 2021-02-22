import './FieldLabel.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class FieldLabel extends React.PureComponent {
	static propTypes = {
		required: PropTypes.bool,
		className: PropTypes.string,
	};

	render() {
		const { required, className, ...props } = this.props;

		return (
			<span
				className={cx('nti-profile-field-label', {
					required,
					className,
				})}
				{...props}
			/>
		);
	}
}
