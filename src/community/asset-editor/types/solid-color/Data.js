import {SolidColorImage} from '@nti/web-whiteboard';

import {getSVGDataURL} from '../../utils';
import {Avatar} from '../../../common';

import {Name as NameConst} from './Constant';

export const Name = NameConst;
export const getAssetState = (url, raw) => {
	const original = SolidColorImage.getSolidColorStateFromSVG(raw);

	if (!original) { return null;}

	return {
		original,
		updated: null
	};
};

export const saveTo = async ({updated}, community, assetName) => {
	const svg = SolidColorImage.getSVGFromSolidColorState(updated, Avatar.aspectRatio);
	const dataURL = await getSVGDataURL(svg);

	const data = {
		[assetName]: dataURL
	};

	const resp = await community.putToLink('edit', data);

	await community.refresh(resp);
};
