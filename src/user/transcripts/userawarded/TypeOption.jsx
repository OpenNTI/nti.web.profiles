import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@nti/web-core';

export default class TranscriptsView extends React.Component {
	static propTypes = {
		option: PropTypes.object,
		onClick: PropTypes.func,
	};

	onClick = () => {
		const { option, onClick } = this.props;

		if (onClick) {
			onClick(option);
		}
	};

	render() {
		const { option } = this.props;

		return (
			<Button className="award-type-option" onClick={this.onClick} plain>
				{option.type + ' ' + option.unit}
			</Button>
		);
	}
}
