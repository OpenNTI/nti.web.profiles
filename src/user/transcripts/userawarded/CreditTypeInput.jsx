import React, { useEffect, useRef } from 'react';

import { Flyout } from '@nti/web-commons';
import { Button, useAsyncValue } from '@nti/web-core';
import { getService } from '@nti/web-client';

const Trigger = React.forwardRef(({ value, ...props }, ref) => (
	<div
		{...props}
		ref={ref}
		className="selected-credit-type"
		css={css`
			width: 180px;
			text-align: left;
			padding-left: 1rem;
			font-size: 14px;
			line-height: 40px;
			font-weight: 300;
			border: solid 1px #ddd;
			border-left: none;
			height: 40px;
			cursor: pointer;
			display: flex;
			position: relative;
			color: var(--secondary-grey);
		`}
	>
		<div
			className="type-value"
			css={css`
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 80%;
			`}
		>
			{value?.toString()}
		</div>
		<i
			className="icon-chevron-down"
			css={css`
				position: absolute;
				right: 0.6rem;
				top: 1rem;
				font-size: 10px;
			`}
		/>
	</div>
));

export function CreditTypeInput({ value, onChange }) {
	const ref = useRef();
	const types =
		useAsyncValue('CreditTypeInput--credit-types', async () =>
			(await getService())
				.getCollection('CreditDefinitions', 'Global')
				?.fetchLinkParsed('self')
		) ?? [];

	useEffect(() => {
		if (value === null && types?.length > 0) {
			onChange?.(types[0]);
		}
	}, [value, types]);

	return (
		<Flyout.Triggered
			className="award-credit-type"
			trigger={<Trigger value={value} />}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			ref={ref}
			css={css`
				:global(.flyout-inner) {
					width: 180px;
				}
			`}
		>
			<div
				css={css`
					max-height: 11rem;
				`}
			>
				{types.map(type => (
					<TypeOption
						key={type.toString()}
						option={type}
						onClick={x => {
							ref.current?.dismiss();
							onChange?.(x);
						}}
					/>
				))}
			</div>
		</Flyout.Triggered>
	);
}

function TypeOption({ option, onClick }) {
	const click = () => void onClick?.(option);
	return (
		<Button
			className="award-type-option"
			onClick={click}
			plain
			css={css`
				font-size: 12px;
				padding: 0.5rem;
				color: var(--secondary-grey);
				cursor: pointer;
				display: block;
				width: 100%;
				text-align: left;
			`}
		>
			{option.toString()}
		</Button>
	);
}
