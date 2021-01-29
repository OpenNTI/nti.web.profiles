import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Credly} from '@nti/web-integrations';
import {getAppUsername} from '@nti/web-client';
import {EmptyState} from '@nti/web-commons';

import Group from '../achievements/Group';

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges',
	empty: {
		other: 'This user has not earned any badges.',
		self: 'You have not earned any badges.'
	}
});

const isAppUser = e => e.Username === getAppUsername();

const Empty = styled(EmptyState)`
	margin: 0;
`;

UserBadges.hasData = u => Credly.Badges.AwardedBadges.hasBadges(u);
UserBadges.propTypes = {
	entity: PropTypes.object
};
export default function UserBadges ({entity}) {
	if (!UserBadges.hasData(entity)) { return null; }

	const emptyState = isAppUser(entity) ?
		(<Empty header={t('empty.self')} />) :
		(<Empty header={t('empty.other')} />)

	return (
		<Group title={t('title')}>
			<Credly.Badges.AwardedBadges
				context={entity}
				emptyState={emptyState}	
			/>
		</Group>
	);
}
