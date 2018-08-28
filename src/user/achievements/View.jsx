import React from 'react';
import PropTypes from 'prop-types';

import Badges from '../badges';
import Certificates from '../certificates';

export default class View extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;

		return !user ? null : (
			<div className="nti-profiles-achievements">
				<Badges entity={user} />
				<Certificates entity={user} />
			</div>
		);
	}
}
