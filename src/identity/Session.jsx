import React, { Suspense } from 'react';

import {
	User,
	Flyout,
	Tooltip,
	DisplayName,
	useService,
} from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { Menu, MenuSeparator, MenuItem as MenuItemBase } from './menus';
import { Container, Box, Dot } from './Session.parts';
import { IdentityCard } from './Card.jsx';
import { PresenceSelect } from './Presence.jsx';

const Trigger = React.forwardRef((props, ref) => (
	<Tooltip label={<DisplayName me />}>
		<Container {...props} ref={ref}>
			<Box>
				<User.Avatar me svg presence />
				<Dot />
			</Box>
		</Container>
	</Tooltip>
));

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
				<Suspense fallback={<div />}>
					<MenuContent />
				</Suspense>
			</Menu>
		</Flyout.Triggered>
	);
}

function MenuContent() {
	const service = useService();
	const supportLinks = service.getSupportLinks();
	const user = service.getAppUserSync();

	return (
		<>
			<IdentityCard />

			<PresenceSelect />

			<MenuItem href={user.getLink('content.permanent_welcome_page')}>
				{t('welcomeGuide')}
			</MenuItem>

			<MenuItem href={supportLinks.about}>{t('about')}</MenuItem>

			<MenuItem href={user.getLink('childrens-privacy')}>
				{t('privacyForMinors')}
			</MenuItem>

			<MenuItem href={supportLinks.privacyPolicy}>
				{t('privacy')}
			</MenuItem>

			<MenuItem href={supportLinks.termsOfService}>{t('terms')}</MenuItem>

			<MenuItem href={supportLinks.support}>{t('support')}</MenuItem>

			<MenuItem href={supportLinks.help}>{t('helpSite')}</MenuItem>

			<MenuSeparator />

			{service.capabilities.canImpersonate && (
				<MenuItem
					href="/begin-impersonation"
					data-testid="impersonate-button"
				>
					{t('impersonate')}
				</MenuItem>
			)}

			<MenuItem href="/logout" data-testid="logout-button">
				{t('logout')}
			</MenuItem>
		</>
	);
}

function MenuItem({ href, ...props }) {
	const empty = x => !x || !x.length;
	if (empty(href)) return null;

	const target =
		new URL(href, window.location.href).origin === window.origin
			? null
			: '_blank';

	return <MenuItemBase target={target} href={href} {...props} />;
}
