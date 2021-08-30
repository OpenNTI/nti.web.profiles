import './Header.scss';
import React from 'react';

import Buttons from './Buttons';
import Nav from './Nav';
import UserInfo from './UserInfo';

export default function Header({ entity }) {
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
