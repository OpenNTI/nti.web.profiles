import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FieldLabel from './FieldLabel';
import ValidationError from './ValidationError';


export default class FieldContainer extends React.Component {

	static propTypes = {
		label: PropTypes.string,
		className: PropTypes.string,
		children: PropTypes.any,
		required: PropTypes.bool,
		error: PropTypes.object
	}

	render () {
		const {label, className, children, required, error} = this.props;

		return (
			<div className={cx('nti-profile-field-container', className, {required})}>
				{label && <FieldLabel>{label}</FieldLabel>}
				{error && <ValidationError error={error} />}
				{children}
			</div>
		);
	}
}
