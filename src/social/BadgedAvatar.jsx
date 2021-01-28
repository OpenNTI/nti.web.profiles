import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';
import ChatWindowView from './ChatWindow';

BadgedAvatar.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	presence: PropTypes.string.isRequired,
};

export default function BadgedAvatar ( { entity, presence } ) {
	const {
		unreadCounts,
	} = Store.useValue();

	const [window, setWindow] = React.useState(false);

	const ChatWindow = ChatWindowView.getChatWindow();

	return (
		<AvatarContainer onClick={() => setWindow(!window)}>
			<Badge badge={unreadCounts ? unreadCounts[entity] : 0} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(5, 4)}>
				<Avatar entity={entity} />
			</Badge>
			<PresenceCircle presence={presence}/>
			<ChatWindow onClose={() => setWindow(false)} entity={entity} visible={window}/>
		</AvatarContainer>
	);
}
