import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { LinkTo } from '@nti/web-routing';
import { Text, Image } from '@nti/web-commons';

import { ResolveEntityProp } from '../../decorators';

import Styles from './Card.css';
import Avatar from './Avatar';

const cx = classnames.bind(Styles);
const getBackgroundImage = src => ({
	style: { backgroundImage: `url(${src})` },
});

class CommunityCard extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		community: PropTypes.shape({
			avatarURL: PropTypes.string,
			displayName: PropTypes.string,
		}).isRequired,
	};

	render() {
		const { className, community, ...otherProps } = this.props;

		return (
			<LinkTo.Object
				data-testid="community-card"
				object={community}
				className={cx('community-card', className)}
				{...otherProps}
			>
				{Avatar.hasAvatar(community) && (
					<Image
						src={community.avatarURL}
						fallback={Avatar.Default}
						childProps={getBackgroundImage}
					>
						<div className={cx('avatar')} />
					</Image>
				)}
				<Text.Condensed className={cx('title')} limitLines={2}>
					{community.displayName}
				</Text.Condensed>
			</LinkTo.Object>
		);
	}
}

export default decorate(CommunityCard, [ResolveEntityProp('community')]);
