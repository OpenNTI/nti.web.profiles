export default styled('div').attrs({
	className: 'social-bar-container'
})`
	position: fixed;
	top: 90px;
	bottom: 60px;
	right: 10px;
	width: 220px;
	background-color: rgba(35, 35, 35, 0.7);
	border-radius: 5px;
	padding-bottom: 60px;
	transition: right 0.5s;

	&.theme-light {
		background-color: rgba(35, 35, 35, 0.15);
	}
`;
