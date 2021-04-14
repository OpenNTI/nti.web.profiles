import { scoped } from '@nti/lib-locale';

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
					<Link>{t('viewProfile')}</Link>
					<Link>{t('manageAccount')}</Link>
				</Links>
			</Meta>
		</Box>
	);
}
