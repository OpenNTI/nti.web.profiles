import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Credly} from '@nti/web-integrations';

import Group from '../achievements/Group';

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges'
});

UserBadges.hasData = u => Credly.Badges.AwardedBadges.hasBadges(u);
UserBadges.propTypes = {
	entity: PropTypes.object
};
export default function UserBadges ({entity}) {
	if (!UserBadges.hasData(entity)) { return null; }

	return (
		<Group title={t('title')}>
			<Credly.Badges.AwardedBadges context={entity} />
		</Group>
	);
}
