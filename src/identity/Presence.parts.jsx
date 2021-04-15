import React, { useState } from 'react';

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
	display: flex;

	input {
		flex: 1 1 auto;
		width: 0;
		height: auto;
		font: inherit;
		line-height: 1.4;
		background: none;
		border: 0;
		padding-left: 0 !important;
	}
`;

const Save = styled(Button).attrs({ children: 'Save' })`
	padding: 0 1em;
	line-height: 30px;
`;

const stop = e => e.stopPropagation();

export const LabelEditor = Label.withComponent(
	({
		className,
		onCancel,
		onSave,
		defaultValue,
		value: initialValue,
		...props
	}) => {
		const [value, setValue] = useState(initialValue);

		const save = () => onSave(value || defaultValue);

		const keyHandler = e => {
			switch (e.key) {
				case 'Escape':
					onCancel();
					stop(e);
					break;

				case 'Enter':
					save();
					stop(e);
			}
		};

		return (
			<>
				<Input.Clearable
					className={className}
					onClick={stop}
					onKeyDown={keyHandler}
				>
					<Input.Text
						{...props}
						placeholder={defaultValue}
						value={value || ''}
						onChange={setValue}
						autoFocus
						autoSelect
					/>
				</Input.Clearable>
				<Save onClick={save} />
			</>
		);
	}
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
	color: var(--tertiary-grey) !important;
	border-style: solid;
	border-color: #fff;
	border-width: 0 1px;
	& > i {
		display: block;
	}
	&:hover {
		color: inherit !important;
		background-color: rgba(0, 0, 0, 0.1);
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
