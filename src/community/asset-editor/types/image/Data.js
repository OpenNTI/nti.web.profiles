import {Name as NameConst} from './Constants';

export const Name = NameConst;
export const getAssetState = (url) => {
	return {
		original: url,
		updated: null
	};
};