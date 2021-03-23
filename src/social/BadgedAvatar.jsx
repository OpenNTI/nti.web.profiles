import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Badge, Hooks } from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';

const MASK_SPEC = {
	tag: 'svg',
	xmlns: 'http://www.w3.org/2000/svg',
	style: {
		position: 'absolute',
		width: 0,
		height: 0,
	},
	cn: {
		tag: 'defs',
		cn: {
			tag: 'mask',
			id: 'presence-mask',
			maskUnits: 'objectBoundingBox',
			maskContentUnits: 'objectBoundingBox',
			cn: [
				{
					tag: 'circle',
					cx: '.50',
					cy: '.50',
					r: '.50',
					fill: 'white',
				},
				{
					tag: 'circle',
					cx: '.90',
					cy: '.90',
					r: '.15',
					fill: 'black',
				},
			],
		},
	},
};

const BorderedAvatar = styled(Avatar)`
	border: 2px solid rgba(0, 0, 0, 0);

	& rect,
	& image {
		mask: url(#presence-mask);
	}

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
	entity: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
		.isRequired,

	presence: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
		.isRequired,

	selected: PropTypes.bool.isRequired,
};

export default function BadgedAvatar({ selected, entity, presence }) {
	const {
		unreadCount,
		clearUnreadCount,
		setSelectedEntity,
	} = Store.useValue();

	Hooks.useSharedDOM(MASK_SPEC);

	const handleClick = () => {
		clearUnreadCount(entity);

		if (selected) {
			setSelectedEntity(null);
		} else {
			setSelectedEntity(entity);
		}
	};

	return (
		<AvatarContainer data-testid="avatar-container" onClick={handleClick}>
			<Badge
				badge={unreadCount ? unreadCount[entity] : 0}
				position={Badge.POSITIONS.TOP_LEFT}
				{...Badge.offset(5, 4)}
			>
				<BorderedAvatar
					entity={entity}
					presence={selected ? presence : ''}
					svg
				/>
			</Badge>
			<PresenceCircle user={entity} />
		</AvatarContainer>
	);
}
