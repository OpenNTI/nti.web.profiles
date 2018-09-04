import {Stores} from '@nti/lib-store';

export const LOADING = 'loading';
export const MEMBERSHIPS = 'memberships';

const REL = 'memberships';

export default class MembershipsStore extends Stores.BoundStore {
	async load () {
		const entity = this.binding;

		if(!entity || !entity.hasLink(REL)) {
			// if a user doesn't have the link, treat it as the empty state
			this.set({
				[LOADING]: false,
				[MEMBERSHIPS]: []
			});

			return;
		}

		this.set(LOADING, true);

		const memberships = await entity.fetchLinkParsed(REL);

		this.set({
			[LOADING]: false,
			[MEMBERSHIPS]: memberships
		});
	}
}
