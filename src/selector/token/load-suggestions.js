import React from 'react';
import {getService} from '@nti/web-client';

import {ListItem} from '../../identity';
import {Data} from '../../community';

async function getSearchResults (term) {
	if (!term || term.length < 3) { return []; }

	const service = await getService();
	const url = service.getUserSearchURL(term);
	const batch = await service.getBatch(url);

	return batch.Items;
}

function buildToken (user) {
	return {
		value: user,
		display: React.createElement(ListItem, {entity: user}),
		isSameToken: (t) => t.value && t.value.getID() === user.getID()
	};
}

export default async function loadSuggestions (match, showEveryone) {
	if (!match && !showEveryone) { return []; }
	if (!match && showEveryone) {
		return [buildToken(Data.EveryoneCommunity)];
	}

	const results = await getSearchResults(match);

	return results.map(buildToken);
}