import React from 'react';

import { Text, User } from '@nti/web-commons';

import { MenuSeparator } from './menus';

const Header = styled(Text.Label)`
	color: var(--tertiary-grey);
	font: normal 600 10px/2 var(--body-font-family);
`;

const Box = styled.div`
	margin: 10px 0 0 15px;
`;

export function PresenceSelect(props) {
	const [pref] = User.usePreference('ChatPresence');
	console.log(pref);
	return (
		<>
			<Box>
				<Header>My Status</Header>
			</Box>
			<MenuSeparator />
		</>
	);
}

/*
	available
	away
	dnd
	offline
*/
