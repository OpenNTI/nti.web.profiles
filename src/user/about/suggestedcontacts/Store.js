import {Stores} from '@nti/lib-store';

export const LOADING = 'loading';
export const SUGGESTIONS = 'suggestions';

const REL = 'SuggestedContacts';

export default class Store extends Stores.BoundStore {
	static deriveBindingFromProps = ({user}) => user

	async load () {
		const entity = this.binding;

		if(!entity || !entity.hasLink(REL)) {
			// if a user doesn't have the link, treat it as the empty state
			this.set({
				[LOADING]: false,
				[SUGGESTIONS]: []
			});

			return;
		}

		this.set(LOADING, true);

		const result = await entity.fetchLinkParsed(REL);
		const suggestions = result.Items || [];

		this.set({
			[LOADING]: false,
			[SUGGESTIONS]: suggestions
		});
	}

}
