import { scoped } from '@nti/lib-locale';
import { useAppUser } from '@nti/web-core';
import { LinkTo } from '@nti/web-routing';

import { Box, Avatar, Meta, DisplayName, Links, Link } from './Card.parts';

const t = scoped('session.identity-card', {
	manageAccount: 'Manage Account',
	viewProfile: 'View Profile',
});

export function IdentityCard(props) {
	const user = useAppUser();
	return (
		<Box>
			<Avatar me />
			<Meta>
				<DisplayName me />
				<Links>
					<LinkTo.Object as={Link} object={user}>
						{t('viewProfile')}
					</LinkTo.Object>
					<LinkTo.Object as={Link} object={user} context="account">
						{t('manageAccount')}
					</LinkTo.Object>
				</Links>
			</Meta>
		</Box>
	);
}
