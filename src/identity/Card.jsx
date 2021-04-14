import React from 'react';

import {
	Avatar as AvatarBase,
	Button,
	DisplayName as DisplayNameBase,
} from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

const t = scoped('session.identity-card', {
	manageAccount: 'Manage Account',
	viewProfile: 'View Profile',
});

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
	font: normal 400 0.875rem/2 var(--body-font-family);
	padding: 8px 0 0 0;
`;

const Links = styled.div`
	font-size: 0.6875rem;
	font-weight: 500;
	line-height: 1;
	color: var(--primary-blue);
`;

const Link = styled(Button).attrs({ plain: true })`
	cursor: pointer;

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

export function IdentityCard(props) {
	return (
		<Box>
			<Avatar me />
			<Meta>
				<DisplayName me />
				<Links>
					<Link>{t('viewProfile')}</Link>
					<Link>{t('manageAccount')}</Link>
				</Links>
			</Meta>
		</Box>
	);
}
