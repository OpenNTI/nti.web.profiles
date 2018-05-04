import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

const MOCK_ITEMS = [
	{ title: 'Introduction to David Mancia', date: new Date('5/2/2018'), type: 'Credit hours', value: 1.5 },
	{ title: 'Brian Kuh\'s Donkey Kong Strategies', date: new Date('5/1/2017'), type: 'CEU credits', value: 3 },
	{ title: 'Carrot Juicer 5000', date: new Date('4/27/2018'), type: 'My points', value: 5.5 }
];

export default class TranscriptTableStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('items', null);
		this.set('loading', true);
		this.set('dateFilter', null);
		this.set('typeFilter', null);
	}

	getSortOn () {
		return this.sortOn;
	}

	setSortOn (sortOn) {
		if (this.sortOn === sortOn) {
			this.sortOrder = this.getSortOrder() === 'ascending' ? 'descending' : 'ascending';
		}
		this.sortOn = sortOn;

		this.loadTranscript();
	}

	getSortOrder () {
		return this.sortOrder || 'ascending';
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
	mockSorted (data) {
		const compare = (a, b) => {
			if(a[this.sortOn] < b[this.sortOn]) {
				return this.getSortOrder() === 'ascending' ? -1 : 1;
			}
			else if(a[this.sortOn] > b[this.sortOn]) {
				return this.getSortOrder() === 'ascending' ? 1 : -1;
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

	getAvailableTypes () {
		return this._availableTypes || [];
	}

	async loadTranscript () {
		this.set('loading', true);
		this.emitChange('loading');

		// const service = await getService();
		//
		// const enrolledCourses = await service.getCollection('EnrolledCourses', 'Courses');
		//
		// const currentLink = enrolledCourses.Links.filter(x => x.rel === 'Current')[0];
		// const archivedLink = enrolledCourses.Links.filter(x => x.rel === 'Archived')[0];
		//
		// const current = currentLink ? await service.getBatch(currentLink.href) : null;
		// const archived = archivedLink ? await service.getBatch(archivedLink.href) : null;
		//
		// const allCompletable = [...this.getCompletableFrom(current), ...this.getCompletableFrom(archived)];
		//
		// const completedCourses = allCompletable.filter(c => c.CourseProgress.CompletedDate);
		// const inProgressCourses = allCompletable.filter(c => !c.CourseProgress.CompletedDate);

		const items = this.mockFiltered(this.mockSorted(MOCK_ITEMS));

		// only load first time?
		if(!this._availableTypes) {
			this._availableTypes = Array.from(new Set(items.map(x => x.type)));
		}

		this.set('loading', false);
		this.set('items', items);
		this.emitChange('loading', 'items', 'dateFilter', 'typeFilter');
	}
}
