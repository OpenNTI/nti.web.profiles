import React, { useRef } from 'react';

import { DayPicker, DateTime, Flyout } from '@nti/web-commons';

import { DateIcon } from './DateIcon';

const DateTrigger = React.forwardRef(DateTriggerImpl);

export function AwardedDateInput({ value, onChange }) {
	const ref = useRef();
	return (
		<Flyout.Triggered
			className="award-credit-date"
			trigger={<DateTrigger value={value} />}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			sizing={Flyout.SIZES.MATCH_SIDE}
			ref={ref}
		>
			<>
				<DayPicker
					value={value}
					onChange={x => {
						ref.current?.dismiss?.();
						onChange(x);
					}}
				/>
			</>
		</Flyout.Triggered>
	);
}

function DateTriggerImpl({ value, ...props }, ref) {
	return (
		<div
			{...props}
			ref={ref}
			className="award-credit-date-value"
			css={css`
				width: 270px;
				text-align: left;
				font-size: 14px;
				line-height: 40px;
				border: solid 1px #ddd;
				height: 40px;
				cursor: pointer;
				color: var(--secondary-grey);
				font-weight: 300;
				display: flex;
			`}
		>
			<DateIcon />
			<div
				className="date-value"
				css={css`
					width: 216px;
					padding-left: 10px;
				`}
			>
				{value && <DateTime date={value} />}
			</div>
			<i
				className="icon-chevron-down"
				css={css`
					float: right;
					margin-right: 0.6rem;
					padding-top: 1rem;
					font-size: 10px;
				`}
			/>
		</div>
	);
}
