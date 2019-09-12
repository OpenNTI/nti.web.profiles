import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Image} from '@nti/web-commons';

import DefaultCommunityAvatar from './assets/default-community-avatar.png';

const aspectRatio = 334 / 175;
const DefaultAvatar = typeof DefaultCommunityAvatar !== 'string' ? DefaultCommunityAvatar.src : DefaultCommunityAvatar;
const t = scoped('nti-profiles.community.common.Avatar', {
	alt: '%(displayName)s Avatar'
});


CommunityAvatar.aspectRatio = aspectRatio;
CommunityAvatar.Default = DefaultAvatar;
CommunityAvatar.hasAvatar = (community) => community && !community.noAvatar;
CommunityAvatar.propTypes = {
	className: PropTypes.string,
	community: PropTypes.shape({
		noAvatar: PropTypes.bool,
		avatarURL: PropTypes.string,
		displayName: PropTypes.string
	})
};
export default function CommunityAvatar ({community, className, ...otherProps}) {
	if (!community || community.noAvatar) { return null; }

	const {avatarURL, displayName} = community;

	return (
		<Image.Container aspectRatio={aspectRatio} className={className}>
			<Image
				src={avatarURL}
				fallback={DefaultAvatar}
				alt={t('alt', {displayName})}
				aspectRatio={aspectRatio}
				letterbox="black"
				{...otherProps}
			/>
		</Image.Container>
	);
}
