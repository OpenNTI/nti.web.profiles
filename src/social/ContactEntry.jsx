import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Badge, DisplayName, User, Tooltip } from '@nti/web-commons';

import Store from './Store';
import { EntryContainer } from './parts/expanded';
import IconContainer from './parts/collapsed/IconContainer';

//#region supporting parts & paint
const PresenceCircle = styled(User.Presence)`
	position: absolute;
	right: 2px;
	bottom: 2px;
	width: 8px;
	height: 8px;
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

const AvatarBorder = styled('div')`
	--size: 42px;
	--active-color: rgba(0, 0, 0, 0);

	border-radius: 100%;
	box-shadow: 0 0 0 2px var(--active-color);
	background: var(----active-color);
	position: absolute;
	width: 42px;
	height: 42px;
	top: 5px;
	cursor: pointer;

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		background-color: var(--active-color);

		/* box-shadow: 0 0 2px 0 rgb(0 0 0); */
	}

	&.selected-available {
		--active-color: var(--presence-available);
	}

	&.selected-away {
		--active-color: var(--presence-away);
	}

	&.selected-dnd {
		--active-color: var(--presence-dnd);
	}
`;

const ConditionalWrapper = ({ condition, wrapper, children }) =>
	condition ? wrapper(children) : children;
//#endregion

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
		clearUnreadCount?.(entity);
		setSelectedEntity?.(selected ? null : entity);
	};

	const Container = expanded ? EntryContainer : IconContainer;

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
							<AvatarBorder
								data-testid="avatar-container"
								onClick={handleClick}
								selected={selected ? presence.getName() : ''}
							>
								<Badge
									badge={unreadCount?.[entity] ?? 0}
									position={Badge.POSITIONS.TOP_LEFT}
									{...Badge.offset(5, 4)}
								>
									<Avatar entity={entity} presence svg />
								</Badge>
								<PresenceCircle user={entity} />
							</AvatarBorder>
							{expanded && <Name entity={entity} />}
						</Container>
					</ConditionalWrapper>
				);
			}}
		</User.Presence>
	);
}
