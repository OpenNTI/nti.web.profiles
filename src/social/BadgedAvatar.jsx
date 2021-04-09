import React from 'react';
import PropTypes from 'prop-types';

import {
	Avatar,
	Badge,
	DisplayName,
	Hooks,
	User,
	Tooltip,
} from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';
import { EntryContainer } from './parts/expanded';
import IconContainer from './parts/collapsed/IconContainer';

const MASK_SPEC = `
<svg style="position:absolute;width:0;height:0">
	<defs>
		<mask id="presence-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
			<circle cx=".50" cy=".50" r=".50" fill="white" />
			<circle cx=".90" cy=".90" r=".15" fill="black" />
		</mask>
	</defs>
</svg>
`;

const Name = styled(DisplayName)`
	margin-left: 48px;
	position: absolute;
	width: 150px;
	height: 42px;
	color: #fff;
	padding: 19px 4px 0 4px;
	font-size: 14px;
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

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

	selected: PropTypes.bool,
	expanded: PropTypes.bool,
};

export default function BadgedAvatar({ selected, entity, expanded }) {
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

	const ConditionalWrapper = ({ condition, wrapper, children }) =>
		condition ? wrapper(children) : children;

	let Container = IconContainer;

	if (expanded) {
		Container = EntryContainer;
	}

	return (
		<User.Presence user={entity}>
			{({ presence }) => {
				if (!presence || presence.status === 'unavailable') {
					// return null;
				}
				return (
					<ConditionalWrapper
						condition={!expanded}
						wrapper={children => {
							return (
								<Tooltip
									label={<DisplayName entity={entity} />}
								>
									{children}
								</Tooltip>
							);
						}}
					>
						<Container>
							<AvatarContainer
								data-testid="avatar-container"
								onClick={handleClick}
							>
								<Badge
									badge={
										unreadCount ? unreadCount[entity] : 0
									}
									position={Badge.POSITIONS.TOP_LEFT}
									{...Badge.offset(5, 4)}
								>
									<BorderedAvatar
										entity={entity}
										presence={
											selected ? presence.status : ''
										}
										svg
									/>
								</Badge>
								<PresenceCircle user={entity} />
							</AvatarContainer>
							{expanded && <Name entity={entity} />}
						</Container>
					</ConditionalWrapper>
				);
			}}
		</User.Presence>
	);
}
