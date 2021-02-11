import PropTypes from 'prop-types';
import React from 'react';
import {DisplayName, Hooks, Tooltip} from '@nti/web-commons';

import Store from '../../Store';
import BadgedAvatar from '../../BadgedAvatar';

import IconContainer from './IconContainer';

const Container = styled.div`
	overflow: hidden;
	height: calc(100% - 120px);
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
					<Tooltip key={index} label={<DisplayName entity={entity}/>} >
						<IconContainer>
							<BadgedAvatar entity={entity} presence={activeUsers[entity]} />
						</IconContainer>
					</Tooltip>

				);
			})}
		</Container>
	);
}
