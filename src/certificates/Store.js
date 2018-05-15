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

		const userEnrollments = await service.getBatch(entity.getLink('UserEnrollments'));

		const allCourses = this.getCompletableFrom(userEnrollments);

		const completedCourses = allCourses.filter(c => c.CourseProgress.CompletedDate);
		const inProgressCourses = allCourses.filter(c => !c.CourseProgress.CompletedDate);

		this.set('loading', false);
		this.set('completedCourses', completedCourses);
		this.set('inProgressCourses', inProgressCourses);
		this.emitChange('loading', 'completedCourses', 'inProgressCourses');
	}
}
