import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

export const LOADING = 'loading';
export const SUGGESTIONS = 'suggestions';

const REL = 'SuggestedContacts';

export default class Store extends Stores.BoundStore {
	static deriveBindingFromProps = ({ user }) => user;

	async load() {
		const entity = this.binding;

		if (!entity || !entity.hasLink(REL)) {
			// if a user doesn't have the link, treat it as the empty state
			this.set({
				[LOADING]: false,
				[SUGGESTIONS]: [],
			});

			return;
		}

		this.set(LOADING, true);

		const service = await getService();
		const result = await service.getBatch(entity.getLink(REL));
		const suggestions = result.Items || [];
		// console.warn('using fake suggested contacts data');
		// const suggestions = Array.from({length: 10}, i => entity);

		this.set({
			[LOADING]: false,
			[SUGGESTIONS]: suggestions,
		});
	}
}
