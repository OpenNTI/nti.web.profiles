import React from 'react';
import PropTypes from 'prop-types';

import Nav from './Nav';
import UserInfo from './UserInfo';

export default class Header extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	render () {
		const {entity} = this.props;

		return (
			<header className="nti-profile-header">
				<UserInfo entity={entity} />
				<Nav entity={entity} />
			</header>
		);
	}
}
