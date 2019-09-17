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
	constructor () {
		super();

		this.set({
			loading: true
		});
	}

	load () {
		if (this.community === this.binding.community && this.searchTerm === this.lastSearchTerm) { return; }

		this.community = this.binding.community;
		this.lastSearchTerm = this.searchTerm;
		this.currentPage = null;

		this.setImmediate({
			loading: false,
			items: null,
			errors: null,
			community: this.community,
			canRemoveMembers: this.community.canRemoveMembers,
			canAddMembers: this.community.canAddMembers
		});

		this.loadNextPage();
	}

	async loadNextPage () {
		const {community, lastSearchTerm, currentPage} = this;
		const dataSource = community.getMembersDataSource();

		const startedLoad = Date.now();

		this.lastLoadStarted = startedLoad;

		this.setImmediate({
			loading: true
		});

		try {
			const page = currentPage ?
				await currentPage.loadNextPage() :
				await dataSource.requestPage(0, getParams(BatchSize, lastSearchTerm));

			if (this.community !== community || lastSearchTerm !== this.searchTerm || this.lastLoadStarted !== startedLoad) { return; }

			if (!page) {
				this.set({loading: false, hasMore: false});
				return;
			}

			this.currentPage = page;

			const existingItems = this.get('items') || [];
			const {hasMore, Items} = page;

			this.setImmediate({
				loading: false,
				searching: false,
				hasMore,
				items: [...existingItems, ...Items]
			});
		} catch (e) {
			this.setImmediate({
				loading: false,
				error: e,
				hasMore: false,
				searching: false
			});
		}
	}

	get loadMore () {
		const hasMore = this.get('hasMore');

		return hasMore ? (() => this.loadNextPage()) : null;
	}

	applySearchTerm (term) {
		this.set({
			items: null,
			searching: Boolean(term)
		});
	}

	clearSelected () {
		this.set({
			selected: {}
		});
	}

	toggleMemberSelected (member) {
		const selected = this.get('selected') || {};
		const memberId = member.getID();

		if (selected[memberId]) {
			delete selected[memberId];
		} else {
			selected[memberId] = member;
		}

		this.set({
			selected: {...selected}
		});
	}

	async removeMemberIds (memberIds) {
		const {community} = this;

		try {
			await community.removeMembers(memberIds);

			delete this.currentPage;
			
			this.setImmediate({
				items: [],
				selected: {}
			});
			
			this.loadNextPage();
		} catch (e) {
			this.set({
				error: e
			});
		}
	}
	removeSelected () {
		const selected = this.get('selected');

		return this.removeMemberIds(Object.keys(selected));
	}


	removeAllMembers () {}


	removeMember (member) {
		return this.removeMemberIds(member.getID ? member.getID() : member);	
	}

	async addMemberIds (memberIds) {
		const {community} = this;

		try {
			await community.addMembers(memberIds);

			delete this.currentPage;
			
			this.setImmediate({
				items: [],
				selected: {}
			});
			
			this.loadNextPage();
		} catch (e) {
			this.set({
				error: e
			});
		}
	}

	addMember (member) {
		return this.addMemberIds(member.getID ? member.getID() : member);	
	}
}