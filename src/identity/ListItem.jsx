import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text, User, List} from '@nti/web-commons';

import {ResolveEntityProp} from '../decorators';
import {Avatar as CommunityAvatar} from '../community';

import Styles from './ListItem.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.identity.ListItem', {
	members: {
		one: '%(count)s Member',
		other: '%(count)s Members'
	}
});

const DisplayTypeToAvatarCmpOverride = {
	'Community': {
		Cmp: CommunityAvatar,
		prop: 'community'
	}
};

const DisplayTypeToPresenceCmp = {
	'Person': User.Presence
};

export default
@ResolveEntityProp('entity')
class ProfileIdentityListItem extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		entity: PropTypes.shape({
			displayType: PropTypes.string,
			avatarURL: PropTypes.string,
			displayName: PropTypes.string,
			email: PropTypes.string,
			memberCount: PropTypes.number
		}).isRequired
	}

	render () {
		const {className, entity, ...otherProps} = this.props;

		const AvatarInfo = DisplayTypeToAvatarCmpOverride[entity.displayType] || {Cmp: User.Avatar, prop: 'user'};
		const Presence = DisplayTypeToPresenceCmp[entity.displayType];

		const {email, memberCount} = entity;

		return (
			<div className={cx('nti-profile-identity-list-item', className)} {...otherProps} >
				<div className={cx('avatar-container')}>
					<AvatarInfo.Cmp {...{[AvatarInfo.prop]: entity}} className={cx('avatar')} />
					{Presence && (<Presence user={entity} border className={cx('presence')} />)}
				</div>
				<div className={cx('info')}>
					<Text.Base>
						<User.DisplayName user={entity} className={cx('name')} />
					</Text.Base>
					<List.SeparatedInline className={cx('meta')}>
						{email && (
							<Text.Base className={cx('email')}>
								{email}
							</Text.Base>
						)}
						{memberCount != null && (
							<Text.Base className={cx('members')}>
								{t('members', {count: memberCount})}
							</Text.Base>
						)}
					</List.SeparatedInline>
				</div>
			</div>
		);
	}
}

