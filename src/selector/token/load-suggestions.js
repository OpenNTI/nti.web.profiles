import {getService} from '@nti/web-client';

async function getSearchResults (term) {
	if (!term || term.length < 3) { return []; }

	const service = await getService();
	const url = service.getUserSearchURL(term);
	const batch = await service.getBatch(url);

	return batch.Items;
}

function buildToken (user) {
	return {
		value: user.getID(),
		display: user.displayName,
		isSameToken: (t) => t.value === user.getID()
	};
}

export default async function loadSuggestions (match, showEveryone) {
	if (!match && !showEveryone) { return []; }
	if (!match && showEveryone) {
		return [{
			value: 'everyone',
			display: 'Everyone',
			isSameToken: (t) => t.value && t.value === 'everyone'
		}];
	}

	const results = await getSearchResults(match);

	return results.map(buildToken);
}