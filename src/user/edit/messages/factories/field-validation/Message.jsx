import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.PureComponent {
	static propTypes = {
		errors: PropTypes.array.isRequired,
		message: PropTypes.string.isRequired,
	};

	onClick = () => {
		const { errors } = this.props;
		const { target } = errors.find(e => e.target && e.target.focus);
		if (target) {
			target.focus();
		}
	};

	render() {
		const { message } = this.props;

		return <div onClick={this.onClick}>{message}</div>;
	}
}
