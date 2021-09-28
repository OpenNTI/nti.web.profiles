import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@nti/web-core';

const MessageContent = styled(Button).attrs({ plain: true })`
	color: #fff;
	font-size: 16px;
	text-align: center;
`;

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

		return (
			<MessageContent onClick={this.onClick}>{message}</MessageContent>
		);
	}
}
