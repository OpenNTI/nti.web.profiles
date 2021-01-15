import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

import Store from './Store';

const Icon = styled('div')`
	--size: 42px;

	position: relative;
	margin: 8px auto;
	width: 42px;
	height: 42px;
	cursor: pointer;

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
	}
`;

const PresenceIcon = styled('div')`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 11px;
	height: 11px;
	background-color: white;
	border-radius: 11px;
	z-index: 3;

	&:after {
		background: var(--primary-green);
		width: 7px;
		height: 7px;
		border-radius: 90px;
		content: "";
		position: absolute;
		display: block;
		left: 2px;
		top: 2px;
	}
`;

UserIcon.propTypes = {
	entity: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
};

export default function UserIcon ( { entity } ) {
	const {
		unreadCount,
		updateLastViewed,
	} = Store.useValue();

	return (
		<Icon onClick={updateLastViewed(entity)}>
			<Badge badge={unreadCount[entity.id]} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(0, 4)}>
				<Avatar entity={entity} />
			</Badge>
			<PresenceIcon />
		</Icon>
	);
}
