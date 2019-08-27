import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import Styles from './Identity.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.activity.components.Identity', {
	edit: 'Edit'
});

CommunityIdentity.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	community: PropTypes.shape({
		canEdit: PropTypes.func,
		displayName: PropTypes.string,
		about: PropTypes.string
	}),
	showOptions: PropTypes.func
};
export default function CommunityIdentity ({community, title, className, showOptions}) {
	return (
		<div className={cx('community-identity', className)}>
			<div className={cx('title')}>
				<Text.Condensed as="div" className={cx('display-name')}>
					{title || community.displayName}
				</Text.Condensed>
				{showOptions && (
					<span className={cx('show-options')} onClick={showOptions} >...</span>
				)}
			</div>
			{community.canEdit() && (
				<LinkTo.Object object={community} className={cx('edit')} context="edit">
					<i className={cx('icon-edit', 'edit-icon')} />
					<Text.Base className={cx('edit-label')}>{t('edit')}</Text.Base>
				</LinkTo.Object>
			)}
			<Text.Base as="div" className={cx('about')}>{community.about}</Text.Base>
		</div>
	);
}