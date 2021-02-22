import React from 'react';
import PropTypes from 'prop-types';

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
			<div className="type-filter-option" onClick={this.onClick}>
				{option}
			</div>
		);
	}
}
