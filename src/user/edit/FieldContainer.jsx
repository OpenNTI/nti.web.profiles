import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FieldLabel from './FieldLabel';


export default class FieldContainer extends React.Component {

	static propTypes = {
		label: PropTypes.string,
		className: PropTypes.string,
		children: PropTypes.any
	}

	render () {
		const {label, className, children} = this.props;

		return (
			<div className={cx('nti-profile-field-container', className)}>
				{label && (
					<FieldLabel>{label}</FieldLabel>
				)}
				{children}
			</div>
		);
	}
}
