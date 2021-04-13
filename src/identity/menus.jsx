import React from 'react';

import { Button, Utils } from '@nti/web-commons';

export const Menu = styled('ul').attrs(props => Utils.filterProps(props, 'ul'))`
	background: #fff;
	border: 1px solid var(--border-grey-alt, #dcdcdc);
	list-style: none;
	margin: 0;
	padding: 0 0 10px 0;
`;

export const MenuSeparator = styled.li`
	background: var(--border-grey-alt, #dcdcdc);
	height: 1px;
	padding: 0;
	margin: 8px 0 18px;
`;

export const MenuItem = styled('li').attrs(
	({ onClick, href, children, ...props }) => ({
		children: React.createElement(Button, {
			plain: true,
			as: 'a',
			onClick,
			href,
			children,
		}),
		...props,
	})
)`
	color: var(--secondary-grey);
	font-size: 1em;
	font-weight: 400;
	background: none;
	padding: 7px 15px;
	margin: 0;
	cursor: pointer;
	overflow: hidden;
	display: flex;
	align-items: center;
	white-space: nowrap;
	text-overflow: ellipsis;

	&:hover {
		background: var(--button-background, #efefef);
		color: var(--primary-grey);
	}
`;
