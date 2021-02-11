import {User} from '@nti/web-commons';

export default styled(User.Presence)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 11px;
	height: 11px;
	border-radius: 11px;
	background-color: rgba(49, 49, 49);

	&:after {
		width: 7px;
		height: 7px;
		border-radius: 90px;
		content: "";
		position: absolute;
		display: block;
		left: 2px;
		top: 2px;
		background: var(--presence-offline);
	}
`;
