import React from 'react';

import { Button, Icons, Input, Text, User } from '@nti/web-commons';

import { MenuItemFrame } from './menus';

export const Header = styled(Text.Label).attrs({ as: 'div' })`
	display: block;
	color: var(--tertiary-grey);
	line-height: 2;
	padding: 10px 0 0 15px;
`;

export const Label = styled(Text.Base)`
	flex: 1 1 auto;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font: normal 400 14px/30px var(--body-font-family);
	color: var(--tertiary-grey);

	input {
		width: 100%;
		height: auto;
		font: inherit;
		line-height: 1.4;
		background: none;
		border: 0;
	}
`;

const Save = styled(Button).attrs({ children: 'Save' })`
	padding: 0 1em;
	line-height: 30px;
`;

export const TextInput = Label.withComponent(
	({ className, onCancel, onSave, ...props }) => (
		<>
			<Input.Clearable className={className} onClear={onCancel}>
				<Input.Text
					{...props}
					autoFocus
					onFocus={e =>
						e.target.setSelectionRange(0, e.target.value.length)
					}
				/>
			</Input.Clearable>
			<Save onClick={onSave} />
		</>
	)
);

export const Check = styled(Icons.Check).attrs({ icon: 'icon-check-10' })`
	margin: 0 3px 0 11px;
	visibility: hidden;
`;

export const Edit = styled(Button).attrs(props => ({
	...props,
	plain: true,
	children: React.createElement(Icons.Pencil),
}))`
	display: none;
	flex: 0 0 auto;
	padding: 7px;
	border-style: solid;
	border-color: #fff;
	border-width: 0 1px;
	& > i {
		display: block;
	}
`;

export const Dot = styled(User.Presence.Dot)`
	flex: 0 0 auto;
	margin: 0 11.5px;
`;

export const Item = styled(MenuItemFrame)`
	align-items: center;
	display: flex;
	padding: 0;

	&.selected ${Check} {
		visibility: visible;
	}

	&:hover ${Edit} {
		display: block;
	}

	&:hover,
	&.selected {
		& ${Label} {
			font-weight: 600;
			color: var(--primary-grey);
		}
	}
`;
