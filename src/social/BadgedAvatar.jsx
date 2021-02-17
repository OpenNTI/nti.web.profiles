import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';
import ChatWindowView from './ChatWindow';

const BorderedAvatar = styled(Avatar)`
	&.presence-available {
		border: 2px solid var(--presence-available);
	}

	&.presence-away {
		border: 2px solid var(--presence-away);
	}

	&.presence-dnd {
		border: 2px solid var(--presence-dnd);
	}
`;

BadgedAvatar.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,

	presence: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,

	expanded: PropTypes.bool,
};

export default function BadgedAvatar ( { entity, presence, expanded } ) {
	const {
		unreadCount,
		clearUnreadCount,
		selectedUser,
		deselectUser,
		selectUser,
		setChatWindow,
		chatWindow,
	} = Store.useValue();

	const ChatWindow = ChatWindowView.getChatWindow();

	const selected = selectedUser === entity;

	const handleClick = () => {
		setChatWindow(!chatWindow);

		clearUnreadCount(entity);
		selected ? deselectUser() : selectUser(entity);
	};

	const handleClose = () => {
		setChatWindow(false);
		selected && deselectUser();
	};

	return (
		<AvatarContainer onClick={handleClick}>
			<Badge badge={unreadCount ? unreadCount[entity] : 0} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(5, 4)} >
				<BorderedAvatar entity={entity} presence={selected ? presence : ''}/>
			</Badge>
			<PresenceCircle entity={entity} presence={presence} />
			{ chatWindow && <ChatWindow onClose={handleClose} entity={entity} expanded={expanded}/> }
		</AvatarContainer>
	);
}
