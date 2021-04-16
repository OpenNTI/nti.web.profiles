import { scoped } from '@nti/lib-locale';
import { useAppUser } from '@nti/web-commons';
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
					<LinkTo.Name as={Link} name="account">
						{t('manageAccount')}
					</LinkTo.Name>
				</Links>
			</Meta>
		</Box>
	);
}
