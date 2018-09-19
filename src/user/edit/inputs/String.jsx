import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class StringInput extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		setValue: PropTypes.func.isRequired
	}

	onChange = ({target: {value}}) => this.props.setValue(value)

	render () {
		const {className, schema: {readonly}, ...props} = this.props;

		delete props.setValue;

		return (
			<input className={cx('nti-profile-string-input', className)} {...props} disabled={readonly} onChange={this.onChange} />
		);
	}
}
