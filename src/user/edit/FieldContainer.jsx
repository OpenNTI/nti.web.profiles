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
		required: PropTypes.bool
	}

	state = {}

	onInvalid = e => {
		const {target: {name, validity, validationMessage: message}} = e;

		this.setState({
			error: {
				name,
				validity,
				message
			}
		});
	}

	render () {
		const {
			props: {
				label,
				className,
				children,
				required
			},
			state: {error}
		} = this;

		return (
			<div className={cx('nti-profile-field-container', className, {required})}>
				{label && <FieldLabel>{label}</FieldLabel>}
				{error && <ValidationError error={error} />}
				{React.cloneElement(React.Children.only(children), {
					onInvalid: this.onInvalid
				})}
			</div>
		);
	}
}
