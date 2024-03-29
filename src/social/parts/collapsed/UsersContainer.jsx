import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import { Hooks } from '@nti/web-commons';
import { Iterable } from '@nti/lib-commons';

import Store from '../../Store';
import ContactEntry from '../../ContactEntry';

const Container = styled.div`
	overflow: hidden;
	height: calc(100% - 120px);
`;

const ICON_HEIGHT = 40;

UsersContainer.propTypes = {
	updateExpandBadge: PropTypes.func.isRequired,
};

export default function UsersContainer({ updateExpandBadge }) {
	const { unreadCount, selectedEntity, iterator } = Store.useValue();

	const containerRef = useRef(null);

	const { height } = Hooks.useWindowSize();

	const iconsThatFit = containerRef
		? Hooks.useVisibleCount(ICON_HEIGHT, containerRef)
		: -1;

	useEffect(() => {
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
			{[
				...Iterable.map(iterator(), entity => (
					<ContactEntry
						entity={entity}
						selected={selectedEntity === entity}
						key={entity.toString()}
					/>
				)),
			]}
		</Container>
	);
}
