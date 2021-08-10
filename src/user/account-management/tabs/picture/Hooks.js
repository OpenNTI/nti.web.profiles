import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

import { useAsyncValue } from '@nti/web-commons';
import { ImageEditor } from '@nti/web-whiteboard';

export const useImage = user => {
	const { avatarURL: uri } = user;
	const reloadNonce = user;

	let uniqueId;
	useEffect(() => {
		if (!uri) {
			uniqueId = uuid();
		}
	});

	return useAsyncValue(
		uri || uniqueId,
		() => (uri ? ImageEditor.getImg(uri) : Promise.resolve('success')),
		reloadNonce
	);
};
