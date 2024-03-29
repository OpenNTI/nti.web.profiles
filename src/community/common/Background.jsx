import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Image } from '@nti/web-commons';
import { useChanges } from '@nti/web-core';

import DefaultCommunityBackground from './assets/default-community-background.png';

const t = scoped('nti-profiles.community.common.Background', {
	alt: '%(displayName)s Background Image',
});

CommunityBackground.Default = DefaultCommunityBackground;
CommunityBackground.hasBackground = community =>
	community && !community.noBackground;
CommunityBackground.propTypes = {
	community: PropTypes.shape({
		noBackground: PropTypes.bool,
		backgroundURL: PropTypes.string,
		blurredAvatarURL: PropTypes.string,
		displayName: PropTypes.string,
	}),
};
export default function CommunityBackground({ community, ...otherProps }) {
	useChanges(community);

	if (!community || community.noBackground) {
		return null;
	}

	const { backgroundURL, blurredAvatarURL, displayName } = community;

	return (
		<Image
			src={backgroundURL || blurredAvatarURL}
			fallback={DefaultCommunityBackground}
			alt={t('alt', { displayName })}
			{...otherProps}
		/>
	);
}
