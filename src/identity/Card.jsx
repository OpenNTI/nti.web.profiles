import { scoped } from '@nti/lib-locale';
import { LinkTo } from '@nti/web-routing';

import { Box, Avatar, Meta, DisplayName, Links, Link } from './Card.parts';

const t = scoped('session.identity-card', {
	manageAccount: 'Manage Account',
	viewProfile: 'View Profile',
});

export function IdentityCard(props) {
	return (
		<Box>
			<Avatar me />
			<Meta>
				<DisplayName me />
				<Links>
					<LinkTo.Name as={Link} name="profile">
						{t('viewProfile')}
					</LinkTo.Name>
					<LinkTo.Name as={Link} name="account">
						{t('manageAccount')}
					</LinkTo.Name>
				</Links>
			</Meta>
		</Box>
	);
}
