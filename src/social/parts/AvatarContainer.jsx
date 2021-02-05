export default styled('div')`
	--size: 42px;

	position: absolute;
	width: 42px;
	height: 42px;
	cursor: pointer;

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
	}
`;
