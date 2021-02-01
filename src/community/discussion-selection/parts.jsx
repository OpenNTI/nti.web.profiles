import React, {useContext, useMemo, useState} from 'react';
import {Utils, DateTime} from '@nti/web-commons';

import HighlightedContent from './HighlightedContent';

export const LayoutContext = React.createContext({layout: 'grid'});

export const composeLayoutProvider = (Cmp) => {
	return React.forwardRef((props, ref) => {
		const [layout, setLayout] = useState('grid');
		const value = useMemo(() => ({layout, setLayout}) , [layout, setLayout]);

		if (Utils.maybeSupportsRefs(Cmp)) {
			props.ref = ref;
		}
		return (
			<LayoutContext.Provider value={value}>
				<Cmp {...props}/>
			</LayoutContext.Provider>
		);
	});
};


export const useLayout = (extra) => {
	return (props) => {
		const {layout} = useContext(LayoutContext);
		return {
			...props,
			...(extra?.call?.(null, props) ?? extra),
			layout
		};
	};
};


export const ListContainerBase = styled('div').attrs(useLayout())`

	/* gap: 10px; */
	--gap: 10px;

	display: flex;
	align-items: flex-start;
	align-content: flex-start;

	&.layout-grid {
		flex-direction: row;
		flex-wrap: wrap;
	}

	&.layout-list {
		flex-direction: column;
	}

	& > * {
		flex: 0 0 auto;

		/* sigh. gap solved this so well... */
		margin: 0 10px 10px 0;
	}
`;

export const Spacer = styled('span').attrs(useLayout())`
	flex: 1 1 0%;

	&.layout-grid {
		display: none;
	}
`;


export const Empty = styled.div`
	position: relative;
	margin-bottom: 1em;
	flex: 0 0 100%;
`;

export const Container = styled('div').attrs(useLayout({'data-testid': 'discussion-selection-item'}))`
	cursor: pointer;
	position: relative;

	&.layout-grid {
		background: var(--button-background);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.28);
		width: 246px;
		height: 200px;
	}

	&.layout-list {
		background: var(--panel-background-alt);
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
		height: 48px;
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		padding-right: 20px;
	}

	&.selected {
		outline: solid 2px var(--primary-blue) !important;
	}
`;


export const Icon = styled('div').attrs(useLayout())`
	height: 120px;
	flex: 0 0 auto;

	&.layout-list {
		width: 60px;
		height: 48px;
	}
`;


export const Avatar = styled(Icon).attrs(({src, style, ...props}) => ({
	'data-testid': 'discussion-selection-avatar',
	style: {
		...style,
		backgroundImage: `url("${src || '/app/resources/images/elements/discussion-icon.png'}")`
	},
	...props,
}))`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

export const Title = styled(HighlightedContent).attrs(useLayout({
	'data-testid':'discussion-selection-topic-title'
}))`
	color: var(--primary-grey);
	letter-spacing: normal;
	text-overflow: ellipsis;
	overflow: hidden;

	&.layout-list {
		font: normal 600 1rem/2 var(--body-font-family);
		white-space: nowrap;
		max-width: 70%;
		width: fit-content;
		flex: 1 1 auto;
	}

	&.layout-grid {
		font: normal 500 26px/1.35 var(--header-font-family);
		font-stretch: condensed;
		padding: 3px 4px 4px;
		width: 100%;
		height: 80px;

		@supports (display: -webkit-box) {
			/* autoprefixer: off */
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
`;

export const Time = styled(DateTime).attrs(useLayout({relative: true}))`
	flex: 0 0 auto;
	width: 115px;
	color: var(--secondary-grey);
	font-size: 11px;
	font-weight: bold;
	line-height: 1.364;
	text-transform: uppercase;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&.layout-grid {
		display: none;
	}
`;
