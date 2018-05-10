import React from 'react';
import PropTypes from 'prop-types';

export default class TranscriptsView extends React.Component {
	static propTypes = {
		option: PropTypes.object,
		onClick: PropTypes.func
	}

	onClick = () => {
		const {option, onClick} = this.props;

		if(onClick) {
			onClick(option);
		}
	}

	render () {
		const {option} = this.props;

		return (
			<div className="award-type-option" onClick={this.onClick}>
				{option.type + ' ' + option.unit}
			</div>
		);
	}
}
