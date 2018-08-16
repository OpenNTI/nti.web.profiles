import React from 'react';
import PropTypes from 'prop-types';

export default class View extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		return (
			<div>Achievements</div>
		);
	}
}
