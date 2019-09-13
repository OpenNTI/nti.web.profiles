import {SolidColorImage} from '@nti/web-whiteboard';

import {isSVG, getSVGDataURL} from '../../utils';

import {Name as NameConst} from './Constant';

export const Name = NameConst;
export const getAssetState = (url, raw) => {
	if (!isSVG(url)) { return null; }

	return {
		original: url,
		updated: null
	};
};

export const saveTo = async ({updated}, community, assetName) => {
	const svg = SolidColorImage.getSVGFromSolidColorState(updated);
	const dataURL = await getSVGDataURL(svg);

	const data = {
		[assetName]: dataURL
	};

	const resp = await community.putToLink('edit', data);

	await community.refresh(resp);
};
