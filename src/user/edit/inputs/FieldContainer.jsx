import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ErrorContext from '../ErrorContext';

import FieldLabel from './FieldLabel';
import ValidationError from './ValidationError';

const noop = () => {};

export default class FieldContainer extends React.PureComponent {

	render () {
		return (
			<ErrorContext.Consumer>
				{
					({onError}) => (
						<ErrorReporter {...this.props} onError={onError} />
					)
				}
			</ErrorContext.Consumer>
		);
	}
}

class ErrorReporter extends React.PureComponent {

	static propTypes = {
		label: PropTypes.string,
		className: PropTypes.string,
		children: PropTypes.any,
		required: PropTypes.bool,
		onError: PropTypes.func
	}

	state = {}

	onInvalid = e => {
		const {onError = noop} = this.props;
		const {target: {name, validity, validationMessage: message}} = e;
		const error = {
			name,
			validity,
			message
		};

		this.setState({
			error
		});

		onError(error);
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
