import React from 'react';


export const ListContainerBase = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: flex-start;
	align-content: flex-start;

	& > * {
		flex: 0 0 auto;
	}
`;

export const Empty = styled.div`
	position: relative;
	margin-bottom: 1em;
	flex: 0 0 100%;
`;

export const Container = styled('div').attrs({'data-testid': 'discussion-selection-item'})`
	cursor: pointer;
	width: 246px;
	height: 200px;
	background: var(--button-background);
	position: relative;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.28);

	&.selected {
		outline: solid 2px var(--primary-blue) !important;
	}
`;
