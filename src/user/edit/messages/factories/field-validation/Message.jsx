import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@nti/web-core';
import { Text } from '@nti/web-commons';

const MessageText = styled(Text.Base)`
	color: #fff;
	font-size: 16px;
	line-height: 40px;
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
			<Button onClick={this.onClick} plain>
				<MessageText>{message}</MessageText>
			</Button>
		);
	}
}
