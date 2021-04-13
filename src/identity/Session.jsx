import React from 'react';

import { User, Flyout, Tooltip, DisplayName } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { Menu, MenuSeparator, MenuItem } from './menus';
import { Container, Box, Dot } from './parts';
import { IdentityCard } from './Card.jsx';
import { PresenceSelect } from './Presence.jsx';

const Trigger = React.forwardRef((props, ref) => {
	return (
		<Tooltip label={<DisplayName me />}>
			<Container {...props} ref={ref}>
				<Box>
					<User.Avatar me svg presence />
					<Dot />
				</Box>
			</Container>
		</Tooltip>
	);
});

const t = scoped('session.menu', {
	welcomeGuide: 'Welcome Guide',
	about: 'About',
	privacyForMinors: 'Children’s Privacy',
	privacy: 'Privacy',
	terms: 'Terms of Service',
	support: 'Technical Support',
	helpSite: 'Help Site',
	impersonate: 'Impersonate User...',
	logout: 'Sign Out',
});

export function Session(props) {
	return (
		<Flyout.Triggered
			trigger={<Trigger />}
			autoDismissOnAction
			menu
			horizontalAlign={Flyout.Triggered.ALIGNMENTS.RIGHT}
		>
			<Menu>
				<IdentityCard />

				<PresenceSelect />

				<MenuSeparator />

				<MenuItem>{t('welcomeGuide')}</MenuItem>
				<MenuItem>{t('about')}</MenuItem>
				<MenuItem>{t('privacyForMinors')}</MenuItem>
				<MenuItem>{t('privacy')}</MenuItem>
				<MenuItem>{t('terms')}</MenuItem>
				<MenuItem>{t('support')}</MenuItem>
				<MenuItem>{t('helpSite')}</MenuItem>
				<MenuSeparator />
				<MenuItem>{t('impersonate')}</MenuItem>
				<MenuItem>{t('logout')}</MenuItem>
			</Menu>
		</Flyout.Triggered>
	);
}
