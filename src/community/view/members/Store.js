import {Stores, Mixins} from '@nti/lib-store';
import {mixin} from '@nti/lib-decorators';

const BatchSize = 20;

function getParams (batchSize, searchTerm) {
	const params = {};

	if (batchSize != null) { params['batchSize'] = batchSize; }
	if (searchTerm != null) { params['searchTerm'] = searchTerm; }

	return params;
}

function dedup (items) {
	const {unique} = items.reduce((acc, item) => {
		const id = item.getID();

		if (!acc.seen[id]) {
			acc.unique.push(item);
			acc.seen[id] = true;
		}

		return acc;
	}, {unique: [], seen: {}});

	return unique;
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
				items: dedup([...existingItems, ...Items])
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
			const resp = await community.removeMembers(memberIds);
			
			const items = this.get('items');
			const {Removed} = resp;
			const removedMap = Removed.reduce((acc, id) => ({...acc, [id]: true}), {});
			
			this.setImmediate({
				items: items.filter(item => !removedMap[item.getID()]),
				selected: {}
			});
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

	removeAllMembers () {
		this.removeMemberIds('everyone');
	}

	removeMember (member) {
		return this.removeMemberIds(member.getID ? member.getID() : member);	
	}

	async addMember (member) {
		const {community} = this;

		try {
			const memberId = member.getID ? member.getID() : member;
			const resp = await community.addMembers(memberId);

			const items = this.get('items');
			const {Added} = resp;
			const wasAdded = Boolean((Added || []).find(u => u === memberId));

			this.set({
				items: wasAdded ? dedup([member, ...items]) : items,
				selected: {}
			});			
		} catch (e) {
			this.set({
				error: e
			});
		}
	}
}