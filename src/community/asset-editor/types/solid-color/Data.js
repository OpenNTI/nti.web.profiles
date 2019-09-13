import {isSVG} from '../../utils';

import {Name as NameConst} from './Constant';

export const Name = NameConst;
export const getAssetState = (url, raw) => {
	if (!isSVG(url)) { return null; }

	return {
		original: url,
		updated: null
	};
};
