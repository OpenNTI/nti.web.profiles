import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Image} from '@nti/web-commons';

import DefaultCommunitBackground from './assets/default-community-background.png';

const DefaultBackground = typeof DefaultCommunitBackground !== 'string' ? DefaultCommunitBackground.src : DefaultCommunitBackground;
const t = scoped('nti-profiles.community.common.Background', {
	alt: '%(displayName)s Background Image'
});

CommunityBackground.Default = DefaultBackground;
CommunityBackground.hasBackground = (community) => community && !community.noBackground;
CommunityBackground.propTypes = {
	community: PropTypes.shape({
		noBackground: PropTypes.bool,
		backgroundURL: PropTypes.string,
		displayName: PropTypes.string
	})
};
export default function CommunityBackground ({community, ...otherProps}) {
	if (!community || community.noBackground) { return null; }

	const {backgroundURL, displayName} = community;

	return (
		<Image
			src={backgroundURL}
			fallback={DefaultBackground}
			alt={t('alt', {displayName})}
			{...otherProps}
		/>
	);
}