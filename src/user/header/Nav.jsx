import React from 'react';

import { scoped } from '@nti/lib-locale';
import { List } from '@nti/web-commons';

import { LOCALE_PATHS } from '../constants';
import Achievements from '../achievements';

import NavLink from './NavLink';

const t = scoped(LOCALE_PATHS.NAV, {
	about: 'About',
	activity: 'Activity',
	achievements: 'Achievements',
	memberships: 'Memberships',
	transcripts: 'Transcripts',
});

const RIList = styled(List.ResponsiveInline)`
	background-color: rgba(0, 0, 0, 0.2);

	& :global(.show-remaining-items) {
		&::before {
			color: var(--tertiary-grey);
			font-weight: 400;
		}

		&.active::before {
			color: white;
			font-weight: 600;
		}
	}
`;

export default function ProfileHeaderNav({ entity }) {
	return (
		<nav>
			<RIList className="profile-header-nav" flyoutProps={{ dark: true }}>
				<NavLink
					object={entity}
					context="about"
					title={t('about')}
					exact
				/>
				{entity.hasLink('Activity') && (
					<NavLink
						object={entity}
						context="activity"
						title={t('activity')}
					/>
				)}
				{Achievements.hasData(entity) && (
					<NavLink
						object={entity}
						context="achievements"
						title={t('achievements')}
					/>
				)}
				<NavLink
					object={entity}
					context="memberships"
					title={t('memberships')}
				/>
				{entity.hasLink('transcript') ? (
					<NavLink
						object={entity}
						context="transcripts"
						title={t('transcripts')}
					/>
				) : null}
			</RIList>
		</nav>
	);
}
