import React from 'react';
import PropTypes from 'prop-types';

export default class Edit extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		return (
			<div>(Edit)</div>
		);
	}
}
