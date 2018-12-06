import {Stores, Mixins} from '@nti/lib-store';
import {getService} from '@nti/web-client';
import {mixin} from '@nti/lib-decorators';

const BATCH_SIZE = 20;

async function loadInitialBatch () {
	const service = await getService();
	const workspace = service.Items.filter(item => item.hasLink('SiteUsers'))[0];

	if (!workspace) { return null; }

	return service.getBatch(workspace.getLink('SiteUsers'), {batchSize: BATCH_SIZE, batchStart: 0});
}

//TODO use user search instead of SiteUsers for this call...
async function loadSearch (term) {
	const service = await getService();
	const workspace = service.Items.filter(item => item.hasLink('SiteUsers'))[0];

	if (!workspace) { return null; }

	return service.getBatch(workspace.getLink('SiteUsers'), {batchSize: BATCH_SIZE, batchStart: 0, searchTerm: term});
}

export default
@mixin(Mixins.Searchable)
class ProfileSelectorStore extends Stores.BoundStore {
	constructor () {
		super();

		this.defaultSearchTerm = undefined;

		this.set({
			loading: true,
			error: null,
			courses: null,
			hasMore: false,
			loadingMore: false,
			errorLoadingMore: null
		});
	}

	async load () {
		//TODO: check the binding to see how to load the courses. For now
		//just load the site users call if it exists
		const {searchTerm} = this;

		this.set({
			loading: true,
			error: null,
			profiles: null,
			hasMore: false,
			loadingMore: false,
			errorLoadingMore: null
		});


		try {
			const batch = searchTerm ? await loadSearch(searchTerm) : await loadInitialBatch();

			//if the search term has changed out from under us
			if ((searchTerm || this.searchTerm) && searchTerm !== this.searchTerm) { return; }

			this.set({
				loading: false,
				profiles: batch ? batch.Items : [],
				hasMore: batch && batch.hasLink('batch-next'),
				loadMoreLink: batch && batch.getLink('batch-next')
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}


	applySearchTerm () {
		this.set({loading: true});
		this.emitChange('searchTerm');
	}


	async loadMore () {
		const profiles = this.get('profiles');
		const link = this.get('loadMoreLink');


		if (!link) { return; }

		this.set({
			loadingMore: true,
			errorLoadingMore: null
		});

		try {
			const service = await getService();
			const batch = await service.getBatch(link);
			const items = batch ? batch.Items : [];

			if (!this.get('loadingMore')) { return; }

			this.set({
				loadingMore: false,
				profiles: [...profiles, ...items],
				loadMoreLink: batch && batch.getLink('batch-next'),
				hasMore: batch && batch.hasLink('batch-next')
			});
		} catch (e) {
			this.set({
				loadingMore: false,
				errorLoadingMore: e
			});
		}
	}
}
