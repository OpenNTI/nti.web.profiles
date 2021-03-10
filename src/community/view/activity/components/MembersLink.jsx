import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import Styles from './MembersLink.css';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.view.activity.components.MembersLink',
	{
		view: 'See All Members',
		manage: 'Manage Members',
		title: '%(displayName)s members',
	}
);

MembersLink.propTypes = {
	community: PropTypes.shape({
		displayName: PropTypes.string,
		canManageMembers: PropTypes.bool,
		hasMembers: PropTypes.bool,
	}),
};
export default function MembersLink({ community }) {
	if (!community.hasMembers) {
		return null;
	}

	return (
		<LinkTo.Object
			object={community}
			context="members"
			className={cx('community-members-link')}
			title={t('title', { displayName: community.displayName })}
		>
			<Text.Base>
				{community.canManageMembers ? t('manage') : t('view')}
			</Text.Base>
		</LinkTo.Object>
	);
}
