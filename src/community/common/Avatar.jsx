import React from 'react';
import PropTypes from 'prop-types';
import {Image} from '@nti/web-commons';

import DefaultCommunityAvatar from './assets/default-community-avatar.png';

const DefaultAvatar = typeof DefaultCommunityAvatar !== 'string' ? DefaultCommunityAvatar.src : DefaultCommunityAvatar;

CommunityAvatar.Default = DefaultAvatar;
CommunityAvatar.hasAvatar = (community) => community && !community.noAvatar;
CommunityAvatar.propTypes = {
	community: PropTypes.shape({
		noAvatar: PropTypes.bool,
		avatarURL: PropTypes.string
	})
};
export default function CommunityAvatar ({community, ...otherProps}) {
	if (!community || community.noAvatar) { return null; }

	const {avatarURL} = community;

	return (
		<Image src={avatarURL} fallback={DefaultAvatar} {...otherProps} />
	);
}
