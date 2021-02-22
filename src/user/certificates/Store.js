import { Stores } from '@nti/lib-store';
import { getService } from '@nti/web-client';

export default class ProfileCertificatesStore extends Stores.SimpleStore {
	constructor() {
		super();

		this.set('inProgressCourses', null);
		this.set('completedCourses', null);
		this.set('loading', false);
	}

	getCompletableFrom(courses) {
		if (!courses) {
			return [];
		}

		return courses.Items.filter(c => c.CourseProgress).filter(
			c => c.CatalogEntry.AwardsCertificate
		);
	}

	async loadCertificates(entity) {
		if (!entity.hasLink('UserEnrollments')) {
			// if a user doesn't have the link, treat it as the empty state
			this.set({
				loading: false,
				completedCourses: [],
				inProgressCourses: [],
			});

			return;
		}

		this.set('loading', true);

		try {
			const service = await getService();

			const userEnrollments = await service.getBatch(
				entity.getLink('UserEnrollments')
			);

			const allCourses = this.getCompletableFrom(userEnrollments);

			const completedCourses = allCourses.filter(
				c => c.CourseProgress.CompletedDate && c.hasLink('Certificate')
			);
			const inProgressCourses = allCourses.filter(
				c => !c.CourseProgress.CompletedDate
			);

			this.set({
				loading: false,
				completedCourses: completedCourses,
				inProgressCourses: inProgressCourses,
			});
		} catch (e) {
			// CannotAccessUserEnrollmentsError likely means the user has no enrollments, it's ok to let that one go
			const error =
				e.code === 'CannotAccessUserEnrollmentsError'
					? null
					: e.message || e;

			this.set({
				loading: false,
				error,
				completedCourses: [],
				inProgressCourses: [],
			});
		}
	}
}
