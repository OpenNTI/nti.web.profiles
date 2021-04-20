import React from 'react';
import PropTypes from 'prop-types';

import {
	Avatar as AvatarBase,
	Badge,
	DisplayName,
	User,
	Tooltip,
} from '@nti/web-commons';

import Store from './Store';
import { AvatarContainer, PresenceCircle } from './parts';
import { EntryContainer } from './parts/expanded';
import IconContainer from './parts/collapsed/IconContainer';

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

const Avatar = styled(AvatarBase)`
	border: 2px solid rgba(0, 0, 0, 0);

	&.selected-available {
		border: 2px solid var(--presence-available);
	}

	&.selected-away {
		border: 2px solid var(--presence-away);
	}

	&.selected-dnd {
		border: 2px solid var(--presence-dnd);
	}
`;

ContactEntry.propTypes = {
	entity: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
		.isRequired,

	selected: PropTypes.bool,
	expanded: PropTypes.bool,
	onClick: PropTypes.func,
};

export default function ContactEntry({ selected, entity, expanded, onClick }) {
	const {
		unreadCount,
		clearUnreadCount,
		setSelectedEntity,
	} = Store.useValue();

	const handleClick = () => {
		onClick?.(entity);

		//TODO: move this out to the calling component...  and handle onClick in the parent component...
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
				if (!presence?.status) {
					return null;
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
									<Avatar
										entity={entity}
										presence
										selected={
											selected ? presence.getName() : ''
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
