import React from 'react';
import PropTypes from 'prop-types';

export default class About extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;

		return (
			<div>(About {user.Username})</div>
		);
	}
}
