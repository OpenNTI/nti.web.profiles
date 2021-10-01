export function DateIcon() {
	return (
		<div
			className="calendar-icon"
			css={css`
				padding: 13px 13px 0;
				border-right: solid 1px #ddd;
				background-color: var(--panel-background);
			`}
		>
			<div
				className="calendar-hanger"
				css={css`
					border-left: solid 2px var(--tertiary-grey);
					border-right: solid 2px var(--tertiary-grey);
					margin-left: 3px;
					height: 1px;
					width: 8px;
				`}
			/>
			<div
				className="calendar-top"
				css={css`
					background-color: var(--tertiary-grey);
					width: 14px;
					height: 2px;
					border-radius: 2px 2px 0 0;
				`}
			/>
			<div
				className="calendar-bottom"
				css={`
					border: solid 2px var(--tertiary-grey);
					width: 14px;
					height: 10px;
				`}
			/>
		</div>
	);
}
