import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

export default class ProfileCertificatesStore extends Stores.SimpleStore {
	constructor () {
		super();

		this.set('inProgressCourses', null);
		this.set('completedCourses', null);
		this.set('loading', false);
	}

	getCompletableFrom (courses) {
		if(!courses) {
			return [];
		}

		return courses.Items.filter(c => c.CourseProgress);
	}

	async loadCertificates (entity) {
		this.set('loading', true);
		this.emitChange('loading');

		const service = await getService();

		const enrolledCourses = await service.getCollection('EnrolledCourses', 'Courses');

		const currentLink = enrolledCourses.Links.filter(x => x.rel === 'Current')[0];
		const archivedLink = enrolledCourses.Links.filter(x => x.rel === 'Archived')[0];

		const current = currentLink ? await service.getBatch(currentLink.href) : null;
		const archived = archivedLink ? await service.getBatch(archivedLink.href) : null;

		const allCompletable = [...this.getCompletableFrom(current), ...this.getCompletableFrom(archived)];

		const completedCourses = allCompletable.filter(c => c.CourseProgress.CompletedDate);
		const inProgressCourses = allCompletable.filter(c => !c.CourseProgress.CompletedDate);

		this.set('loading', false);
		this.set('completedCourses', completedCourses);
		this.set('inProgressCourses', inProgressCourses);
		this.emitChange('loading', 'completedCourses', 'inProgressCourses');
	}
}
