import PropTypes from 'prop-types';
import React from 'react';
import {Hooks} from '@nti/web-commons';

import Store from '../../Store';
import BadgedAvatar from '../../BadgedAvatar';

import { IconContainer } from '.';

const styles = css`
	.container {
		overflow: hidden;
		height: calc(100% - 120px);
	}
`;

const ICON_HEIGHT = 40;

UsersContainer.propTypes = {
	updateExpandBadge: PropTypes.func.isRequired,
};

export default function UsersContainer ( { updateExpandBadge } ) {
	const {
		activeUsers,
		unreadCount,
	} = Store.useValue();

	const containerRef = React.useRef(null);

	const {height} = Hooks.useWindowSize();

	const iconsThatFit = containerRef ? Hooks.useVisibleCount(ICON_HEIGHT, containerRef) : -1;

	React.useEffect(() => {
		const hiddenSum = unreadCount && Object.keys(unreadCount)
			.slice(iconsThatFit)
			.reduce((accumulator, entity) => accumulator + unreadCount[entity], 0);

		updateExpandBadge(hiddenSum);
	}, [height]);

	return (
		<Container ref={containerRef}>
			{activeUsers && Object.keys(activeUsers).map((entity, index) => {
				return (
					<IconContainer key={index}>
						<BadgedAvatar entity={entity} presence={activeUsers[entity]} />
					</IconContainer>
				);
			})}
		</div>
	);
}
