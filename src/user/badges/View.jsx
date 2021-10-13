import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Credly } from '@nti/web-integrations';

import Group from '../achievements/Group';

import EmptyState from './EmptyState';

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges',
	empty: {
		other: 'This user has not earned any badges.',
		self: 'You have not earned any badges.',
	},
});

UserBadges.hasData = u => Credly.Badges.AwardedBadges.hasBadges(u);
UserBadges.propTypes = {
	entity: PropTypes.object,
};
export default function UserBadges({ entity }) {
	if (!UserBadges.hasData(entity)) {
		return null;
	}

	const emptyState = <EmptyState entity={entity} />;

	return (
		<Group title={t('title')}>
			<Credly.Badges.AwardedBadges
				context={entity}
				emptyState={emptyState}
			/>
		</Group>
	);
}
