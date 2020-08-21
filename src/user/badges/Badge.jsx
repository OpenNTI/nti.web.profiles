import './Badge.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class Badge extends React.Component {

	static propTypes = {
		item: PropTypes.object.isRequired
	}

	render () {
		const {item: {image}} = this.props;

		const style = {
			backgroundImage: `url('${image}')`
		};

		return (
			<div className="badge" style={style} />
		);
	}
}
