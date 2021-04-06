import PropTypes from 'prop-types';
import React from 'react';
import {
	DisplayName,
	Hooks,
	Tooltip,
	User
} from '@nti/web-commons';

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

export default function UsersContainer({ updateExpandBadge }) {
	const {
		unreadCount,
		selectedEntity,
		iterator
	} = Store.useValue();

	const containerRef = React.useRef(null);

	const { height } = Hooks.useWindowSize();

	const iconsThatFit = containerRef
		? Hooks.useVisibleCount(ICON_HEIGHT, containerRef)
		: -1;

	React.useEffect(() => {
		const hiddenSum =
			unreadCount &&
			Object.keys(unreadCount)
				.slice(iconsThatFit)
				.reduce(
					(accumulator, entity) => accumulator + unreadCount[entity],
					0
				);

		updateExpandBadge(hiddenSum);
	}, [height]);

	return (
		<Container ref={containerRef}>
			{iterator().map((entity, index) => {
					return (
						<User.Presence user={entity} key={index}>
							{({presence}) => {
								const status = presence ? presence.status : 'unavailable';
								if (status === 'unavailable') {
									return null;
								}
								return (
									<Tooltip
										label={<DisplayName entity={entity} />}
									>
										<IconContainer>
											<BadgedAvatar
												entity={entity}
												selected={selectedEntity === entity }
											/>
										</IconContainer>
									</Tooltip>
								);
							}}
						</User.Presence>
					);
				})
			}
		</Container>
	);
}
