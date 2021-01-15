export default styled('div')`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 11px;
	height: 11px;
	background-color: white;
	border-radius: 11px;

	&:after {
		background: var(--primary-green);
		width: 7px;
		height: 7px;
		border-radius: 90px;
		content: "";
		position: absolute;
		display: block;
		left: 2px;
		top: 2px;
	}
`;
