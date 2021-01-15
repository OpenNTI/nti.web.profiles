import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';

BadgedAvatar.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
};

export default function BadgedAvatar ( { entity } ) {
	const {
		unreadCount,
		updateLastViewed,
	} = Store.useValue();

	return (
		<AvatarContainer onClick={updateLastViewed(entity)}>
			<Badge badge={unreadCount[entity.id]} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(0, 4)}>
				<Avatar entity={entity} />
			</Badge>
			<PresenceCircle />
		</AvatarContainer>
	);
}
