import {Stores, Mixins} from '@nti/lib-store';
import {mixin} from '@nti/lib-decorators';

const BatchSize = 20;

function getParams (batchSize, searchTerm) {
	const params = {};

	if (batchSize != null) { params['batchSize'] = batchSize; }
	if (searchTerm != null) { params['searchTerm'] = searchTerm; }

	return params;
}

export default
@mixin(Mixins.Searchable)
class CommunityMembersStore extends Stores.BoundStore {
	load () {
		if (this.community === this.binding.community && this.searchTerm === this.lastSearchTerm) { return; }

		this.community = this.binding.community;
		this.lastSearchTerm = this.searchTerm;
		this.currentPage = null;

		this.setImmediate({
			loading: false,
			items: null,
			errors: null,
			canRemoveMembers: this.community.canRemoveMembers,
			canAddMembers: this.community.canAddMembers
		});

		this.loadNextPage();
	}

	async loadNextPage () {
		const {community, lastSearchTerm, currentPage} = this;
		const dataSource = community.getMembersDataSource();

		this.setImmediate({
			loading: true
		});

		try {
			const page = currentPage ?
				await currentPage.loadNextPage() :
				await dataSource.requestPage(0, getParams(BatchSize, lastSearchTerm));

			if (this.community !== community || lastSearchTerm !== this.searchTerm) { return; }

			if (!page) {
				this.set({loading: false, hasMore: false});
				return;
			}

			this.currentPage = page;

			const existingItems = this.get('items') || [];
			const {hasMore, Items} = page;

			this.setImmediate({
				loading: false,
				hasMore,
				items: [...existingItems, ...Items]
			});
		} catch (e) {
			this.setImmediate({
				loading: false,
				error: e,
				hasMore: false
			});
		}
	}

	get loadMore () {
		const hasMore = this.get('hasMore');

		return hasMore ? (() => this.loadNextPage()) : null;
	}


	toggleMemberSelected (memberId) {
		const selected = this.get('selected') || {};

		if (selected[memberId]) {
			delete selected[memberId];
		} else {
			selected[memberId] = true;
		}

		this.set({
			selected: {...selected}
		});
	}

	removeSelected () {
		const selected = this.get('selected');

		return this.removeMember(Object.keys(selected));
	}

	async removeMember (member) {
		const {community} = this;

		try {
			await community.removeMembers(member);

			delete this.currentPage;
			
			this.setImmediate({
				items: []
			});
			
			this.loadNextPage();
		} catch (e) {
			this.set({
				error: e
			});
		}
	}

	async addMembers (members) {
		const {community} = this;

		try {
			await community.addMembers(members);

			delete this.currentPage;
			
			this.setImmediate({
				items: []
			});
			
			this.loadNextPage();
		} catch (e) {
			this.set({
				error: e
			});
		}
	}
}