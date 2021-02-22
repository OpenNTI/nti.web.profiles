import React from 'react';
import classnames from 'classnames/bind';
import { getService } from '@nti/web-client';

import { ListItem } from '../../identity';
import { Data } from '../../community';

import Styles from './View.css';

const cx = classnames.bind(Styles);

async function getSearchResults(term) {
	if (!term || term.length < 3) {
		return [];
	}

	const service = await getService();
	const url = service.getUserSearchURL(term);
	const batch = await service.getBatch(url);

	return batch.Items;
}

function buildToken(user) {
	return {
		value: user,
		tokenId: user.getID(),
		display: React.createElement(ListItem, {
			entity: user,
			className: cx('selector-token'),
		}),
		isSameToken: t => t.value && t.value.getID() === user.getID(),
		isExactMatch: () => false,
	};
}

export default async function loadSuggestions(match, selected, showEveryone) {
	if (
		(!match && !showEveryone) ||
		(!match && selected && selected.length > 0)
	) {
		return [];
	}
	if (!match && showEveryone) {
		return [buildToken(Data.EveryoneCommunity)];
	}

	const results = await getSearchResults(match);

	return results.map(buildToken);
}
