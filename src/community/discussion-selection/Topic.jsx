import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import { Avatar, Container, Spacer, Title, Time } from './parts';

const Topic = React.forwardRef(function Topic ({onClick, item, selected, searchTerm}, ref) {
	const handleClick = useCallback(() => onClick(item), [onClick, item]);

	return (
		<Container selected={selected} onClick={handleClick} ref={ref}>
			<Avatar src={item.icon}/>
			<Title
				content={item.title}
				term={searchTerm}
			/>
			<Spacer/>
			<Time date={item.getCreatedTime()}/>
		</Container>
	);
});

Topic.propTypes = {
	onClick: PropTypes.func,
	searchTerm: PropTypes.string,
	selected: PropTypes.bool,
	item: PropTypes.object.isRequired,
};

export default Topic;
