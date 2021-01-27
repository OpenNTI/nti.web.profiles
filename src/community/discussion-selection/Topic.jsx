import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';
import { Container } from './parts';

export const Avatar = styled('div').attrs(({src, style, ...props}) => ({
	'data-testid': 'discussion-selection-avatar',
	style: {
		...style,
		backgroundImage: `url("${src || '/app/resources/images/elements/discussion-icon.png'}")`
	},
	...props,
}))`
	height: 120px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

export const Title = styled(HighlightedContent).attrs({'data-testid':'discussion-selection-topic-title'})`
	color: var(--primary-grey);
	font: normal 500 26px/1.35 var(--header-font-family);
	font-stretch: condensed;
	letter-spacing: normal;
	padding: 4px;
	padding-top: 3px;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 246px;
	height: 80px;

	@supports (display: -webkit-box) {
		/* autoprefixer: off */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
`;

const Topic = React.forwardRef(function Topic ({onClick, item, selected, searchTerm}, ref) {
	const handleClick = useCallback(() => onClick(item), [onClick, item]);

	return (
		<Container selected={selected?.has(item)} onClick={handleClick} ref={ref}>
			<Avatar src={item.icon}/>
			<Title
				content={item.title}
				term={searchTerm}
			/>
		</Container>
	);
});

Topic.propTypes = {
	onClick: PropTypes.func,
	searchTerm: PropTypes.string,
	selected: PropTypes.object,
	item: PropTypes.object.isRequired,
};

export default Topic;
