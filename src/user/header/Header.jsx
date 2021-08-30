import './Header.scss';
import React from 'react';
import PropTypes from 'prop-types';

import Buttons from './Buttons';
import Nav from './Nav';
import UserInfo from './UserInfo';

export default class Header extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
	};

	render() {
		const { entity } = this.props;

		return (
			<>
				<Buttons entity={entity} />
				<header className="nti-profile-header">
					<UserInfo entity={entity} />
					<Nav entity={entity} />
				</header>
			</>
		);
	}
}
