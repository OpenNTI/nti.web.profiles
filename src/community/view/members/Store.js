import { Stores, Mixins } from '@nti/lib-store';
import { mixin } from '@nti/lib-decorators';
import { decorate } from '@nti/lib-commons';

const BatchSize = 20;

function getParams(batchSize, searchTerm) {
	const params = {};

	if (batchSize != null) {
		params['batchSize'] = batchSize;
	}
	if (searchTerm != null) {
		params['searchTerm'] = searchTerm;
	}

	return params;
}

function dedup(items) {
	const { unique } = items.reduce(
		(acc, item) => {
			const id = item.getID();

			if (!acc.seen[id]) {
				acc.unique.push(item);
				acc.seen[id] = true;
			}

			return acc;
		},
		{ unique: [], seen: {} }
	);

	return unique;
}

class CommunityMembersStore extends Stores.BoundStore {
	constructor() {
		super();

		this.set({
			loading: true,
		});
	}

	load() {
		if (
			this.community === this.binding.community &&
			this.searchTerm === this.lastSearchTerm
		) {
			return;
		}

		this.community = this.binding.community;
		this.lastSearchTerm = this.searchTerm;
		this.currentPage = null;

		this.setImmediate({
			loading: false,
			items: null,
			errors: null,
			community: this.community,
			canRemoveMembers: this.community.canRemoveMembers,
			canAddMembers: this.community.canAddMembers,
		});

		this.loadNextPage();
	}

	async loadNextPage() {
		const { community, lastSearchTerm, currentPage } = this;
		const dataSource = community.getMembersDataSource();

		const startedLoad = Date.now();

		this.lastLoadStarted = startedLoad;

		this.setImmediate({
			loading: true,
		});

		try {
			const page = currentPage
				? await currentPage.loadNextPage()
				: await dataSource.requestPage(
						0,
						getParams(BatchSize, lastSearchTerm)
				  );

			if (
				this.community !== community ||
				lastSearchTerm !== this.searchTerm ||
				this.lastLoadStarted !== startedLoad
			) {
				return;
			}

			if (!page) {
				this.set({ loading: false, hasMore: false });
				return;
			}

			this.currentPage = page;

			const existingItems = this.get('items') || [];
			const { hasMore, Items } = page;

			this.setImmediate({
				loading: false,
				searching: false,
				hasMore,
				items: dedup([...existingItems, ...Items]),
			});
		} catch (e) {
			this.setImmediate({
				loading: false,
				error: e,
				hasMore: false,
				searching: false,
			});
		}
	}

	get loadMore() {
		const hasMore = this.get('hasMore');

		return hasMore ? () => this.loadNextPage() : null;
	}

	applySearchTerm(term) {
		this.set({
			items: null,
			searching: Boolean(term),
		});
	}

	clearSelected() {
		this.set({
			selected: {},
		});
	}

	toggleMemberSelected(member) {
		const selected = this.get('selected') || {};
		const memberId = member.getID();

		if (selected[memberId]) {
			delete selected[memberId];
		} else {
			selected[memberId] = member;
		}

		this.set({
			selected: { ...selected },
		});
	}

	async removeMemberIds(memberIds) {
		const { community } = this;

		this.setImmediate({
			removing: true,
		});

		try {
			const resp = await community.removeMembers(memberIds);

			if (memberIds === 'everyone') {
				delete this.currentPage;
				this.setImmediate({
					loading: true,
					items: [],
					selected: {},
					removing: false,
				});
				this.loadNextPage();
				return;
			}

			// NTI-11236 tl;dr: if an event fired during the `community.removeMembers` action,
			// this may be null or different than when we started...
			//
			// The exhibiting error: `items` was null because applySearchTerm was called before
			//  this method resumed after community.removeMembers() returned. The source of the
			//  bug was a silly `null !== undefined` in Searchable mixin, and once that was
			//  fixed it fixed this, however, I'm leaving this comment for the future since
			//  this  may come back to bite us again (race condition)
			const items = this.get('items');
			const { Removed } = resp;
			const removedMap = Removed.reduce(
				(acc, id) => ({ ...acc, [id]: true }),
				{}
			);

			this.setImmediate({
				items: items.filter(item => !removedMap[item.getID()]),
				selected: {},
				removing: false,
			});
		} catch (e) {
			this.set({
				error: e,
				removing: false,
			});
		}
	}

	removeSelected() {
		const selected = this.get('selected');

		return this.removeMemberIds(Object.keys(selected));
	}

	removeAllMembers() {
		this.removeMemberIds('everyone');
	}

	removeMember(member) {
		return this.removeMemberIds(member.getID ? member.getID() : member);
	}

	setPendingMembers(pending) {
		this.setImmediate({ pending });
	}

	async addPendingMembers() {
		const { community } = this;
		const pending = this.get('pending');

		if (!pending || !pending.length) {
			return;
		}

		const { hasEveryone, onlyUsers, toAdd } = pending.reduce(
			(acc, member) => {
				const id = member.value.getID();

				if (!member.value.isUser) {
					acc.onlyUsers = false;
				}

				if (id === 'everyone') {
					acc.hasEveryone = true;
				} else {
					acc.toAdd.push(id);
				}

				return acc;
			},
			{ hasEveryone: false, onlyUsers: true, toAdd: [] }
		);

		this.set({
			pending: null,
			adding: true,
		});

		try {
			const resp = await community.addMembers(
				hasEveryone ? 'everyone' : toAdd
			);

			if (hasEveryone || !onlyUsers) {
				delete this.currentPage;
				this.setImmediate({
					loading: true,
					items: [],
					pending: null,
					adding: false,
				});
				this.loadNextPage();
				return;
			}

			const items = this.get('items');
			const addedSet = new Set((resp && resp.Added) || []);
			const wasAdded = pending
				.filter(m => addedSet.has(m.value.getID()))
				.map(m => m.value);

			this.set({
				items: dedup([...wasAdded, ...items]),
				selected: {},
				pending: null,
				adding: false,
			});
		} catch (e) {
			this.set({
				error: e,
			});
		}
	}
}

export default decorate(CommunityMembersStore, [mixin(Mixins.Searchable)]);
