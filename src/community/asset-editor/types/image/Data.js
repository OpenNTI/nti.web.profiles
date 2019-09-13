import {ImageEditor} from '@nti/web-whiteboard';

import {Name as NameConst} from './Constants';

export const Name = NameConst;
export const getAssetState = (url) => {
	return {
		original: url,
		updated: null
	};
};

export const saveTo = async ({updated}, community, assetName) => {
	const dataURL = ImageEditor.getDataURLForEditorState(updated);
	const data = {
		[assetName]: dataURL
	};

	const resp = await community.putToLink('edit', data);

	await community.refresh(resp);
};