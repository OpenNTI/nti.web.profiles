// import {getService} from '@nti/web-client';
import {Stores} from '@nti/lib-store';

export const EARNED = 'earned';
export const AVAILABLE = 'available';
export const LOADING = 'loading';

export default class ProfileBadgesStore extends Stores.SimpleStore {
	async load (entity) {
		if(!entity.hasLink('Badges')) {
			// if a user doesn't have the link, treat it as the empty state
			this.set(LOADING, false);
			this.set(EARNED, []);
			this.set(AVAILABLE, []);
			this.emitChange(LOADING, EARNED, AVAILABLE);

			return;
		}

		this.set(LOADING, true);
		this.emitChange(LOADING);

		// const service = await getService();

		// const userEnrollments = await service.getBatch(entity.getLink('UserEnrollments'));
		//
		// const allCourses = this.getCompletableFrom(userEnrollments);
		//
		// const completedCourses = allCourses.filter(c => c.CourseProgress.CompletedDate);
		// const inProgressCourses = allCourses.filter(c => !c.CourseProgress.CompletedDate);

		// TODO: temporary placeholder
		const [available, earned] = await Promise.all([
			Promise.resolve([]),
			Promise.resolve([])
		]);

		this.set(LOADING, false);
		this.set(EARNED, earned);
		this.set(AVAILABLE, available);
		this.emitChange(LOADING, EARNED, AVAILABLE);
	}
}
