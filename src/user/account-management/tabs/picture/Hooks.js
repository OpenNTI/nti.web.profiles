import { useAsyncValue } from '@nti/web-commons';
import { ImageEditor } from '@nti/web-whiteboard';

export const useImage = user => {
	const { avatarURL: uri } = user;
	const reloadNonce = user;
	return useAsyncValue(uri, () => ImageEditor.getImg(uri), reloadNonce);
};
