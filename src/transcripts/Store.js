import {Stores} from '@nti/lib-store';
// import {getService} from '@nti/web-client';

const MOCK_ITEMS = [
	{ title: 'Introduction to David Mancia', date: new Date('5/2/2018'), type: 'Credit', unit: 'hours', value: 1.5 },
	{ title: 'Introduction to David Mancia', date: new Date('4/24/2018'), type: 'My', unit: 'points', value: 7 },
	{ title: 'Brian Kuh\'s Donkey Kong Strategies', date: new Date('5/1/2017'), type: 'CEU', unit: 'credits', value: 3 },
	{ title: 'Brian Kuh\'s Donkey Kong Strategies', date: new Date('5/1/2017'), type: 'Credit', unit: 'hours', value: 9 },
	{ title: 'Carrot Juicer 5000', date: new Date('4/27/2018'), type: 'My', unit: 'points', value: 5.5 }
];

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

	// TODO: remove this, let server do sorting
	mockSorted (data, sortKey) {
		const compare = (a, b) => {
			const sortOn = sortKey ? this.sortOn[sortKey] && this.sortOn[sortKey].replace(sortKey + '-', '') : this.sortOn['defaultKey'];

			if(a[sortOn] < b[sortOn]) {
				return this.getSortOrder(sortKey || 'defaultKey') === 'ascending' ? -1 : 1;
			}
			else if(a[sortOn] > b[sortOn]) {
				return this.getSortOrder(sortKey || 'defaultKey') === 'ascending' ? 1 : -1;
			}

			return 0;
		};

		return [...data].sort(compare);
	}

	// TODO: remove this, let server do filtering
	mockFiltered (data) {
		const dateFilter = this.get('dateFilter');
		const typeFilter = this.get('typeFilter');

		let filtered = [...data];

		if(dateFilter) {
			const {startDate, endDate} = dateFilter;

			if(startDate) {
				filtered = filtered.filter(x => x.date.getTime() >= startDate.getTime());
			}

			if(endDate) {
				filtered = filtered.filter(x => x.date.getTime() <= endDate.getTime());
			}
		}

		if(typeFilter) {
			filtered = filtered.filter(x => x.type === typeFilter);
		}

		return filtered;
	}

	// TODO: let server do this
	buildAggregates (items) {
		let agg = [];
		let aggMap = {};

		items.forEach(item => {
			let combined = item.type + ' ' + item.unit;
			if(aggMap[combined]) {
				aggMap[combined] += item.value;
			}
			else {
				aggMap[combined] = item.value;
			}
		});

		Object.keys(aggMap).forEach(k => {
			agg.push({type: k.split(' ')[0], unit: k.split(' ')[1], value: aggMap[k]});
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
		this.set('loading', true);
		this.emitChange('loading');

		// TODO: load aggregate data from server based on entity

		// const aggSort = this.sortOn[AGG_KEY] && this.sortOn[AGG_KEY].replace(AGG_KEY + '-', '');
		// const aggSortOrder = this.getSortOrder(AGG_KEY);
		//
		// const normalSort = this.sortOn[DEFAULT_KEY] && this.sortOn[DEFAULT_KEY];
		// const normalSortOrder = this.getSortOrder(DEFAULT_KEY);
		//
		//
		// console.log(aggSort + ' ' + aggSortOrder + ' ---- ' + normalSort + ' ' + normalSortOrder);

		// TODO: load detailed data from server



		const items = this.mockFiltered(this.mockSorted(MOCK_ITEMS));

		const aggregateItems = this.mockSorted(this.buildAggregates(this.mockFiltered(MOCK_ITEMS)), 'agg');

		// only load first time?
		if(!this._availableTypes) {
			this._availableTypes = Array.from(new Set(items.map(x => x.type)));
		}

		this.set('loading', false);
		this.set('items', items);
		this.set('aggregateItems', aggregateItems);
		this.emitChange('loading', 'items', 'aggregateItems', 'dateFilter', 'typeFilter');
	}
}
