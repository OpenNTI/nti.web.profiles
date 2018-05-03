import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

const MOCK_ITEMS = [
	{ title: 'abc', date: 'May 3rd, 2018', type: 'Credit hours', value: '15' },
	{ title: 'def', date: 'May 1st, 2018', type: 'CEU credits', value: '3' },
	{ title: '555', date: 'April 27th, 2018', type: 'My points', value: '55' }
];

export default class TranscriptTableStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('items', null);
		this.set('loading', true);
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

		this.set('loading', false);
		this.set('items', this.mockSorted(MOCK_ITEMS));
		this.emitChange('loading', 'items');
	}
}
