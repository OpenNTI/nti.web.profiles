import { scoped } from '@nti/lib-locale';

import EveryoneCommunityAvatar from './assets/global-community-asset.svg';

const t = scoped('nti-profile.community.common.Constants', {
	everyone: 'Everyone',
});

export const EveryoneCommunity = {
	getID() {
		return 'everyone';
	},

	get displayName() {
		return t('everyone');
	},
	get avatarURL() {
		return EveryoneCommunityAvatar;
	},
};
