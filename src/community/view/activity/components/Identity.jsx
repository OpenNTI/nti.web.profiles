import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import {Avatar, MembershipControls} from '../../../common';

import Styles from './Identity.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.activity.components.Identity', {
	edit: 'Edit'
});

CommunityIdentity.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	community: PropTypes.shape({
		isModifiable: PropTypes.bool,
		displayName: PropTypes.string,
		about: PropTypes.string
	}),
	showOptions: PropTypes.func,
	showJoin: PropTypes.bool
};
export default function CommunityIdentity ({community, title, className, showOptions, showJoin}) {
	const hasAvatar = Avatar.hasAvatar(community);

	return (
		<div className={cx('community-identity', className, {avatar: hasAvatar})}>
			{hasAvatar && (<Avatar className={cx('avatar')} community={community} />)}
			<div className={cx('title')}>
				<Text.Condensed as="div" className={cx('display-name')}>
					{title || community.displayName}
				</Text.Condensed>
				{showOptions && (
					<span className={cx('show-options')} onClick={showOptions} >...</span>
				)}
				{showJoin && (
					<MembershipControls.Join
						showLeave
						community={community}
						className={cx('identity-join')}
						onNoAccess={LinkTo.Static.goHome}
					/>
				)}
			</div>
			{community.isModifiable && (
				<LinkTo.Object object={community} className={cx('edit', 'community-edit-link')} context="edit">
					<i className={cx('icon-edit', 'edit-icon')} />
					<Text.Base className={cx('edit-label')}>{t('edit')}</Text.Base>
				</LinkTo.Object>
			)}
			<Text.Base as="div" className={cx('about')}>{community.about}</Text.Base>
		</div>
	);
}
