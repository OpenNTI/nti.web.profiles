import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

// const AGG_KEY = 'agg';
const DEFAULT_KEY = 'defaultKey';

export default class TranscriptTableStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.sortOn = {};
		this.sortOrder = {};

		this.set('items', null);
		this.set('aggregateItems', null);
		this.set('loading', true);
		this.set('dateFilter', null);
		this.set('typeFilter', null);
	}

	getSortOn (sortKey) {
		return this.sortOn[sortKey || DEFAULT_KEY];
	}

	setSortOn (sortOn, sortKey) {
		const effectiveSortKey = sortKey || DEFAULT_KEY;

		if (this.sortOn[effectiveSortKey] === sortOn) {
			this.sortOrder[effectiveSortKey] = this.getSortOrder(sortKey) === 'ascending' ? 'descending' : 'ascending';
		}
		this.sortOn[effectiveSortKey] = sortOn;

		this.loadTranscript();
	}

	getSortOrder (sortKey) {
		const effectiveSortKey = sortKey || DEFAULT_KEY;

		return this.sortOrder[effectiveSortKey] || 'ascending';
	}

	setDateFilter (newDateFilter) {
		this.set('dateFilter', newDateFilter);

		this.loadTranscript();
	}

	setTypeFilter (newTypeFilter) {
		this.set('typeFilter', newTypeFilter);

		this.loadTranscript();
	}

	// TODO: let server do this
	buildAggregates (items) {
		let agg = [];
		let aggMap = {};
		let defMap = {};

		items.forEach(item => {
			let key = item.creditDefinition.type + ' ' + item.creditDefinition.unit;
			if(aggMap[key]) {
				aggMap[key] += item.amount;
			}
			else {
				aggMap[key] = item.amount;
			}

			defMap[key] = item.creditDefinition;
		});

		Object.keys(aggMap).forEach(k => {
			const def = defMap[k];
			agg.push({creditDefinition: def, amount: aggMap[k]});
		});

		return agg;
	}

	getAggregateValues () {
		const items = this.get('items') || [];

		return this.buildAggregates(items);
	}

	getAvailableTypes () {
		return this._availableTypes || [];
	}

	async loadTranscript (entity) {
		if(entity) {
			this.entity = entity;
		}

		this.set('loading', true);
		this.emitChange('loading');

		const typeFilter = this.get('typeFilter');
		const dateFilter = this.get('dateFilter');

		let params = {};

		if(typeFilter) {
			params.definitionType = typeFilter;
		}

		if(dateFilter) {
			if(dateFilter.startDate) {
				params.notBefore = dateFilter.startDate.getTime() / 1000;
			}

			if(dateFilter.endDate) {
				params.notAfter = dateFilter.endDate.getTime() / 1000;
			}
		}

		const service = await getService();
		const results = await service.getBatch(this.entity.getLink('transcript'), params);
		const items = results && results.Items || [];

		// only load first time?
		if(!this._availableTypes) {
			this._availableTypes = Array.from(new Set(items.map(x => x.creditDefinition.type)));
		}

		this.set('loading', false);
		this.set('items', items);
		this.emitChange('loading', 'items', 'dateFilter', 'typeFilter');
	}
}
