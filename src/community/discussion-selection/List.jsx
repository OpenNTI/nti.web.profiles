import React from 'react';
import PropTypes from 'prop-types';

import { filterItemsBySearchTerm } from './utils';
import { ListContainerBase, Empty } from './parts';
import NewTopic from './NewTopic';
import Topic from './Topic';
import Placeholder from './Placeholder';

const Container = styled(ListContainerBase)`
	margin-top: 30px;
`;


List.propTypes = {
	items: PropTypes.shape({
		hasMore: PropTypes.bool,
		more: PropTypes.func,
		[Symbol.iterator]: PropTypes.func,
	}),
	searchTerm: PropTypes.string,
	onCreate: PropTypes.func,
	onSelect: PropTypes.func,
};


export default function List ({ items, onCreate, onSelect, searchTerm, ...props}) {
	const filteredItems = filterItemsBySearchTerm(items, searchTerm);

	return (
		<Container data-testid="discussion-selection-list">

			{(!filteredItems?.length) && (
				<Empty data-testid="no-results">
					No discussions found
				</Empty>
			)}

			<NewTopic onClick={onCreate}/>

			{filteredItems.map((item, i) => (
				<Topic
					key={i}
					item={item}
					onClick={onSelect}
					searchTerm={searchTerm}
					{...props}
				/>
			)
			)}

			{items.hasMore && (
				<Placeholder key={filteredItems.length} load={items.more}/>
			)}
		</Container>
	);
}

