import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';

UserIcon.propTypes = {
	user: PropTypes.object.isRequired,
};

const Icon = styled("div")`
	--size: 42px;
	vertical-align: middle;
	border-radius: 50%;
	max-width: var(--size);
	position: absolute;
	left: 0;
	top: 0;

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
	}
`;

export default function UserIcon ( { user } ) {
	const {
		unreadCount,
		updateLastViewed,
	} = Store.useValues();

	return (
		<Badge theme={Badge.THEMES.SUCCESS} position={Badge.POSITIONS.BOTTOM_RIGHT}>
			<Badge badge={unreadCount[user.id]} position={Badge.POSITIONS.TOP_LEFT}>
				<Icon onClick={updateLastViewed(user)}>
					<Avatar entity={user} />
				</Icon>
			</Badge>
		</Badge>
	);
}
