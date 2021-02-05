import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';
import ChatWindowView from './ChatWindow';

const MaskedAvatar = styled(Avatar)`
	-webkit-mask-image: radial-gradient( circle, transparent 0, transparent 5px, black 6px );
   	-webkit-mask-position: right calc(-15px - var(--badge-offset-x, 0px)) bottom calc(-15px - var(--badge-offset-y, 0px));
	.presence-available {
		border: 2px solid var(--presence-available);
	}
	.presence-away {
		border: 2px solid var(--presence-away);
	}
	.presence-dnd {
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
		selectUser
	} = Store.useValue();

	const [window, setWindow] = React.useState(false);

	const ChatWindow = ChatWindowView.getChatWindow();

	const selected = selectedUser === entity;

	const handleClick = () => {
		setWindow(!window);
		clearUnreadCount(entity);
		selected ? deselectUser() : selectUser(entity);
	};

	const handleClose = () => {
		setWindow(false);
		selectedUser === entity && deselectUser();
	};

	return (
		<AvatarContainer onClick={handleClick}>
			<Badge badge={unreadCount ? unreadCount[entity] : 0} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(5, 4)}>
				<MaskedAvatar entity={entity} presence={selected ? presence : ''}/>
			</Badge>
			<PresenceCircle presence={presence}/>
			{ window && <ChatWindow onClose={handleClose} entity={entity} visible={window} expanded={expanded}/> }
		</AvatarContainer>
	);
}
