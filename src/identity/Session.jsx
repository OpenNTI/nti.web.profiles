import React from 'react';

import { User, Flyout, Tooltip, DisplayName } from '@nti/web-commons';

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

				<MenuItem>Welcome</MenuItem>
				<MenuItem>About</MenuItem>
				<MenuItem>Privacy</MenuItem>
				<MenuItem>Terms of Service</MenuItem>
				<MenuItem>Technical Support</MenuItem>
				<MenuItem>Help Site</MenuItem>
				<MenuSeparator />
				<MenuItem>Impersonate User...</MenuItem>
				<MenuItem>Sign Out</MenuItem>
			</Menu>
		</Flyout.Triggered>
	);
}
