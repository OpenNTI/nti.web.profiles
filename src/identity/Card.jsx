import React from 'react';

import {
	Avatar as AvatarBase,
	Button,
	DisplayName as DisplayNameBase,
} from '@nti/web-commons';

const Box = styled.div`
	padding: 5px;
	border-bottom: 1px solid var(--border-grey-light, #ededed);
	display: flex;
	flex-direction: row;
	width: 260px;
`;

const Avatar = styled(AvatarBase)`
	width: 60px;
	height: 60px;
	flex: 0 0 auto;
`;

const DisplayName = styled(DisplayNameBase)`
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Meta = styled.div`
	flex: 1 1 auto;
	margin: 0 0 0 15px;
	font: normal 400 0.9em/2 var(--body-font-family);
	padding: 8px 0 0 0;
`;

const Links = styled.div`
	font-size: 0.8em;
	font-weight: 500;
	line-height: 1;
	color: var(--primary-blue);
`;

const Link = styled(Button).attrs({ plain: true })`
	&:not(:last-child)::after {
		content: ' · ';
		font-size: 1.1em;
	}
`;

export function IdentityCard(props) {
	return (
		<Box>
			<Avatar me />
			<Meta>
				<DisplayName me />
				<Links>
					<Link>View Profile</Link>
					<Link>Manage Account</Link>
				</Links>
			</Meta>
		</Box>
	);
}
