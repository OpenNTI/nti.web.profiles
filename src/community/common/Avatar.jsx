import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Image } from '@nti/web-commons';
import { useChanges } from '@nti/web-core';

import DefaultCommunityAvatar from './assets/default-community-avatar.png';

const aspectRatio = 334 / 175;
const t = scoped('nti-profiles.community.common.Avatar', {
	alt: '%(displayName)s Avatar',
});

CommunityAvatar.aspectRatio = aspectRatio;
CommunityAvatar.Default = DefaultCommunityAvatar;
CommunityAvatar.hasAvatar = community => community?.avatar !== false;
CommunityAvatar.propTypes = {
	className: PropTypes.string,
	community: PropTypes.shape({
		avatar: PropTypes.bool,
		avatarURL: PropTypes.string,
		displayName: PropTypes.string,
	}),
};
export default function CommunityAvatar({
	community,
	className,
	...otherProps
}) {
	useChanges(community);

	if (!community || community.avatar === false) {
		return null;
	}

	const { avatarURL, displayName } = community;

	return (
		<Image.Container aspectRatio={aspectRatio} className={className}>
			<Image
				src={avatarURL}
				fallback={DefaultCommunityAvatar}
				alt={t('alt', { displayName })}
				aspectRatio={aspectRatio}
				letterbox="black"
				{...otherProps}
			/>
		</Image.Container>
	);
}
