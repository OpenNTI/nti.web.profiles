import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@nti/web-core';
export default class TypeFilterOption extends React.Component {
	static propTypes = {
		option: PropTypes.string.isRequired,
		onClick: PropTypes.func,
	};

	onClick = () => {
		const { onClick, option } = this.props;

		if (onClick) {
			onClick(option);
		}
	};

	render() {
		const { option } = this.props;

		return (
			<Button className="type-filter-option" onClick={this.onClick} plain>
				{option}
			</Button>
		);
	}
}
