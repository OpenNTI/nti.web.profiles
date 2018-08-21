import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

// const AGG_KEY = 'agg';
const DEFAULT_KEY = 'defaultKey';

const FIELD_MAP = {
	value: 'amount',
	date: 'awarded_date',
	type: 'credit_definition'
};

export default class TranscriptTableStore extends Stores.SimpleStore {
	static Singleton = true

	constructor () {
		super();

		this.sortOn = {};
		this.sortOrder = {};

		this.set('items', null);
		this.set('aggregateItems', null);
		this.set('loading', true);
		this.set('dateFilter', null);
		this.set('typeFilter', null);
		this.set('csvLink', null);
		this.set('pdfLink', null);
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

	resetAllFilters () {
		this.set('dateFilter', null);
		this.set('typeFilter', []);

		this.loadTranscript();
	}

	resetTypeFilters () {
		this.set('typeFilter', []);

		this.loadTranscript();
	}

	addTypeFilter (newTypeFilter) {
		let newTypes = this.get('typeFilter') || [];
		newTypes.push(newTypeFilter);
		this.set('typeFilter', newTypes);

		this.loadTranscript();
	}

	removeTypeFilter (type) {
		let newTypes = (this.get('typeFilter') || []).filter(x => x !== type);
		this.set('typeFilter', newTypes);

		this.loadTranscript();
	}

	getEndOfDay (endDate) {
		const endOfDay = new Date(endDate);
		endOfDay.setHours(23);
		endOfDay.setMinutes(59);
		endOfDay.setSeconds(59);
		endOfDay.setMilliseconds(999);

		return endOfDay;
	}

	makeFilterParams () {
		const typeFilter = this.get('typeFilter');
		const dateFilter = this.get('dateFilter');

		let params = '';

		if(typeFilter) {
			typeFilter.forEach(type => {
				params += '&definitionType=' + type;
			});
		}

		if(dateFilter) {
			if(dateFilter.startDate) {
				params += '&notBefore=' + dateFilter.startDate.getTime() / 1000;
			}

			if(dateFilter.endDate) {
				params += '&notAfter=' + this.getEndOfDay(dateFilter.endDate).getTime() / 1000;
			}
		}

		return params;
	}

	makeSortParams () {
		let params = '';

		if(this.getSortOn()) {
			params += '&sortOn=' + FIELD_MAP[this.getSortOn()];
		}

		if(this.getSortOrder()) {
			params += '&sortOrder=' + this.getSortOrder();
		}

		return params;
	}

	getReport (rel, type) {
		const report = this.entity && this.entity.Reports && this.entity.Reports.filter(x => x.rel === rel)[0];

		if(!report || !report.supportedTypes.includes(type)) {
			return null;
		}

		return report.href + '?format=' + type + this.makeFilterParams() + this.makeSortParams();
	}

	getCSVReport () {
		return this.getReport('report-UserTranscriptReport', 'text/csv');
	}

	getPDFReport () {
		return this.getReport('report-UserTranscriptReport', 'application/pdf');
	}

	// TODO: let server do this
	buildAggregates (items) {
		let agg = [];
		let aggMap = {};
		let defMap = {};

		items.forEach(item => {
			if(!item.creditDefinition) {
				return;
			}

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

		agg.sort(function (a, b) {
			const lowerAType = a.creditDefinition.type.toLowerCase();
			const lowerBType = b.creditDefinition.type.toLowerCase();

			return (lowerAType > lowerBType) - (lowerAType < lowerBType);
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

	getEntity () {
		return this.entity;
	}

	maybeAddToAvailableTypes (creditDefinition) {
		// TODO: it'd be nice to not have to add this manually (what happens when user awarded credit is removed?)
		// But the only way we could do that is, after successful add/edit/removal, query the server for the unfiltered
		// list of credits for this entity and gather up all of the aggregate the available types
		if(this._availableTypes && !this._availableTypes.includes(creditDefinition.type)) {
			this._availableTypes.push(creditDefinition.type);
		}
	}

	async addUserAwardedCredit (data, creditDefinition) {
		const transcriptLink = this.entity.getLink('transcript');
		const service = await getService();

		await service.put(transcriptLink, data);

		this.maybeAddToAvailableTypes(creditDefinition);

		await this.loadTranscript();
	}

	async editUserAwardedCredit (credit, data, creditDefinition) {
		const itemLink = credit.getLink('edit');
		const service = await getService();

		await service.put(itemLink, data);

		this.maybeAddToAvailableTypes(creditDefinition);

		await this.loadTranscript();
	}

	async deleteUserAwardedCredit (credit) {
		const deleteLink = credit.getLink('delete');
		const service = await getService();

		await service.delete(deleteLink);

		await this.loadTranscript();
	}

	async loadTranscript (entity) {
		if(entity) {
			this.entity = entity;
			this._availableTypes = null;
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
				params.notAfter = this.getEndOfDay(dateFilter.endDate).getTime() / 1000;
			}
		}

		if(this.getSortOn()) {
			params.sortOn = FIELD_MAP[this.getSortOn()];
		}

		if(this.getSortOrder()) {
			params.sortOrder = this.getSortOrder();
		}

		const service = await getService();
		const results = await service.getBatch(this.entity.getLink('transcript'), params);
		const items = results && results.Items || [];

		if(!this._availableTypes) {
			this._availableTypes = Array.from(new Set(items.map(x => x.creditDefinition.type)));
		}

		this.set('csvLink', this.getCSVReport());
		this.set('pdfLink', this.getPDFReport());
		this.set('loading', false);
		this.set('items', this.entity.hasLink('add_credit') ? [{isAddRow: true}, ...items] : items);
		this.set('availableTypes', this._availableTypes);
		this.set('aggregateItems', this.getAggregateValues());

		this.emitChange('loading', 'items', 'aggregateItems', 'dateFilter', 'typeFilter', 'availableTypes', 'csvLink', 'pdfLink');
	}
}
