import {
	Avatar as AvatarBase,
	Button,
	DisplayName as DisplayNameBase,
} from '@nti/web-commons';

export const Box = styled.div`
	padding: 5px;
	border-bottom: 1px solid var(--border-grey-light, #ededed);
	display: flex;
	flex-direction: row;
	width: 260px;
	overflow: hidden;
`;

export const Avatar = styled(AvatarBase)`
	width: 60px;
	height: 60px;
	flex: 0 0 auto;
`;

export const DisplayName = styled(DisplayNameBase)`
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const Meta = styled.div`
	flex: 1 1 auto;
	margin: 0 0 0 15px;
	font: normal 400 0.875rem/2 var(--body-font-family);
	padding: 8px 0 0 0;
`;

export const Links = styled.div`
	font-size: 0.6875rem;
	font-weight: 500;
	line-height: 1;
	color: var(--primary-blue);
`;

export const Link = styled(Button).attrs({ plain: true })`
	cursor: pointer;

	&:link,
	&:visited {
		text-decoration: none;
		color: currentColor;
	}

	&:hover {
		text-decoration: underline;
	}

	&:not(:last-child)::after {
		content: ' · ';
		font-size: 1.1em;
		display: inline-block;
		margin: 0 0.3em;
		text-decoration: none !important;
	}
`;
