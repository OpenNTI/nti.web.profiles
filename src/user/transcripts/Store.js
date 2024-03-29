import { Stores } from '@nti/lib-store';
import { Models } from '@nti/lib-interfaces';

const { AggregateCredit } = Models.credit;
const DEFAULT_KEY = 'defaultKey';

const FIELD_MAP = {
	value: 'amount',
	date: 'awarded_date',
	type: 'credit_definition',
};

export default class TranscriptTableStore extends Stores.SimpleStore {
	static Singleton = true;

	constructor() {
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

	getSortOn(sortKey) {
		return this.sortOn[sortKey || DEFAULT_KEY];
	}

	setSortOn(sortOn, sortKey) {
		const effectiveSortKey = sortKey || DEFAULT_KEY;

		if (this.sortOn[effectiveSortKey] === sortOn) {
			this.sortOrder[effectiveSortKey] =
				this.getSortOrder(sortKey) === 'ascending'
					? 'descending'
					: 'ascending';
		}
		this.sortOn[effectiveSortKey] = sortOn;

		this.loadTranscript();
	}

	getSortOrder(sortKey) {
		const effectiveSortKey = sortKey || DEFAULT_KEY;

		return this.sortOrder[effectiveSortKey] || 'ascending';
	}

	setDateFilter(newDateFilter) {
		this.set('dateFilter', newDateFilter);

		this.loadTranscript();
	}

	resetAllFilters() {
		this.set('dateFilter', null);
		this.set('typeFilter', []);

		this.loadTranscript();
	}

	resetTypeFilters() {
		this.set('typeFilter', []);

		this.loadTranscript();
	}

	addTypeFilter(newTypeFilter) {
		let newTypes = this.get('typeFilter') || [];
		newTypes.push(newTypeFilter);
		this.set('typeFilter', newTypes);

		this.loadTranscript();
	}

	removeTypeFilter(type) {
		let newTypes = (this.get('typeFilter') || []).filter(x => x !== type);
		this.set('typeFilter', newTypes);

		this.loadTranscript();
	}

	getEndOfDay(endDate) {
		const endOfDay = new Date(endDate);
		endOfDay.setHours(23);
		endOfDay.setMinutes(59);
		endOfDay.setSeconds(59);
		endOfDay.setMilliseconds(999);

		return endOfDay;
	}

	makeFilterParams() {
		const typeFilter = this.get('typeFilter');
		const dateFilter = this.get('dateFilter');

		let params = '';

		if (typeFilter) {
			typeFilter.forEach(type => {
				params += '&definitionType=' + type;
			});
		}

		if (dateFilter) {
			if (dateFilter.startDate) {
				params += '&notBefore=' + dateFilter.startDate.getTime() / 1000;
			}

			if (dateFilter.endDate) {
				params +=
					'&notAfter=' +
					this.getEndOfDay(dateFilter.endDate).getTime() / 1000;
			}
		}

		return params;
	}

	makeSortParams() {
		let params = '';

		if (this.getSortOn()) {
			params += '&sortOn=' + FIELD_MAP[this.getSortOn()];
		}

		if (this.getSortOrder()) {
			params += '&sortOrder=' + this.getSortOrder();
		}

		return params;
	}

	getReport(rel, type) {
		const report =
			this.entity &&
			this.entity.Reports &&
			this.entity.Reports.filter(x => x.rel === rel)[0];

		if (!report || !report.supportedTypes.includes(type)) {
			return null;
		}

		return (
			report.href +
			'?format=' +
			type +
			this.makeFilterParams() +
			this.makeSortParams()
		);
	}

	getCSVReport() {
		return this.getReport('report-UserTranscriptReport', 'text/csv');
	}

	getPDFReport() {
		return this.getReport('report-UserTranscriptReport', 'application/pdf');
	}

	getAggregateValues() {
		return AggregateCredit.from(this.get('items') || []);
	}

	getAvailableTypes() {
		return this._availableTypes || [];
	}

	getEntity() {
		return this.entity;
	}

	maybeAddToAvailableTypes(creditDefinition) {
		// TODO: it'd be nice to not have to add this manually (what happens when user awarded credit is removed?)
		// But the only way we could do that is, after successful add/edit/removal, query the server for the unfiltered
		// list of credits for this entity and gather up all of the aggregate the available types
		if (
			this._availableTypes &&
			!this._availableTypes.includes(creditDefinition.type)
		) {
			this._availableTypes.push(creditDefinition.type);
		}
	}

	async addUserAwardedCredit(data, creditDefinition) {
		if (!data.MimeType) {
			data.MimeType =
				'application/vnd.nextthought.credit.userawardedcredit';
		}

		await this.entity.putToLink('transcript', data);

		this.maybeAddToAvailableTypes(creditDefinition);

		await this.loadTranscript();
	}

	async editUserAwardedCredit(credit, data, creditDefinition) {
		await credit.putToLink('edit', data);

		this.maybeAddToAvailableTypes(creditDefinition);

		await this.loadTranscript();
	}

	async deleteUserAwardedCredit(credit) {
		await credit.deleteLink('delete');

		await this.loadTranscript();
	}

	async loadTranscript(entity) {
		if (entity) {
			this.entity = entity;
			this._availableTypes = null;
		}

		this.set('loading', true);
		this.emitChange('loading');

		const typeFilter = this.get('typeFilter');
		const dateFilter = this.get('dateFilter');

		let params = {};

		if (typeFilter) {
			params.definitionType = typeFilter;
		}

		if (dateFilter) {
			if (dateFilter.startDate) {
				params.notBefore = dateFilter.startDate.getTime() / 1000;
			}

			if (dateFilter.endDate) {
				params.notAfter =
					this.getEndOfDay(dateFilter.endDate).getTime() / 1000;
			}
		}

		if (this.getSortOn()) {
			params.sortOn = FIELD_MAP[this.getSortOn()];
		}

		if (this.getSortOrder()) {
			params.sortOrder = this.getSortOrder();
		}

		const items =
			(
				await this.entity.fetchLink({
					mode: 'batch',
					rel: 'transcript',
					params,
				})
			)?.Items || [];

		if (!this._availableTypes) {
			this._availableTypes = Array.from(
				new Set(items.map(x => x.creditDefinition.type))
			);
		}

		this.set('csvLink', this.getCSVReport());
		this.set('pdfLink', this.getPDFReport());
		this.set('loading', false);
		this.set(
			'items',
			this.entity.hasLink('add_credit')
				? [{ isAddRow: true }, ...items]
				: items
		);
		this.set('availableTypes', this._availableTypes);
		this.set('aggregateItems', this.getAggregateValues());

		this.emitChange(
			'loading',
			'items',
			'aggregateItems',
			'dateFilter',
			'typeFilter',
			'availableTypes',
			'csvLink',
			'pdfLink'
		);
	}
}
