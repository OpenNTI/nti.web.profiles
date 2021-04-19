export default styled('div')`
	--size: 42px;
	--active-color: rgba(0, 0, 0, 0);

	border-radius: 100%;
	box-shadow: 0 0 0 2px var(--active-color);
	background: var(----active-color);
	position: absolute;
	width: 42px;
	height: 42px;
	top: 5px;
	cursor: pointer;

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		background-color: var(--active-color);

		/* box-shadow: 0 0 2px 0 rgb(0 0 0); */
	}

	&.selected-available {
		--active-color: var(--presence-available);
	}

	&.selected-away {
		--active-color: var(--presence-away);
	}

	&.selected-dnd {
		--active-color: var(--presence-dnd);
	}
`;
