import React from 'react';
import PropTypes from 'prop-types';

import {
	About as AboutCard,
	Empty
} from './parts';

export default class About extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;

		return (
			<div>
				<Empty />
				<AboutCard user={user} />
			</div>
		);
	}
}
