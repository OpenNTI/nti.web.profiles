import {getService} from '@nti/web-client';
import {Stores} from '@nti/lib-store';

import mockEarned from './mock/badges-earned.json';
import mockEarnable from './mock/badges-earnable.json';

export const EARNED = 'EarnedBadges'; // this is the collection title in the badges workspace. don't change.
export const EARNABLE = 'EarnableBadges'; // this is the collection title in the badges workspace. don't change.
export const LOADING = 'loading';

const WORKSPACE_REL = 'Badges';

const MOCK_DATA = {
	[EARNED]: mockEarned,
	[EARNABLE]: mockEarnable
};

export default class ProfileBadgesStore extends Stores.SimpleStore {
	async load (entity) {
		if(!entity.hasLink(WORKSPACE_REL)) {
			// if a user doesn't have the link, treat it as the empty state
			this.set(LOADING, false);
			this.set(EARNED, []);
			this.set(EARNABLE, []);
			this.emitChange(LOADING, EARNED, EARNABLE);

			return;
		}

		this.set(LOADING, true);
		this.emitChange(LOADING);

		// using Promise.all just for concurrency, so one isn't waiting on the other
		const [service, {Items: collections}] = await Promise.all([
			getService(),
			entity.fetchLink(WORKSPACE_REL)
		]);

		const requests = [EARNED, EARNABLE].map(title => {
			const collection = collections.find(c => c.Title === title);
			if (collection && collection.href) {
				console.warn('Using mock badges data.');
				return Promise.resolve(MOCK_DATA[title]);
				// return service.get(collection.href);
			}
		}).filter(Boolean);

		const results = await Promise.all(requests);
		results.forEach(r => this.set(r.Title, r.Items));

		this.set(LOADING, false);
		this.emitChange(LOADING, EARNED, EARNABLE);
	}
}
