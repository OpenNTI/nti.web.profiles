import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DateTime} from '@nti/web-commons';

import Styles from './Groupers.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.activity.components.Groupers', {
	today: 'Today',
	yesterday: 'Yesterday'
});


//Taken from webapp Time utils
export function getTimeGroupHeader (time) {
	const timestamp = time.getTime();
	const now = new Date();

	const oneDayAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
	const twoDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
	const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);

	const between = (start, end) => start.getTime() < timestamp && timestamp <= end.getTime();

	if (between(oneDayAgo, now)) {
		return t('today');
	}

	if (between(twoDaysAgo, oneDayAgo)) {
		return t('yesterday');
	}

	if (between(oneWeekAgo, twoDaysAgo)) {
		//TODO: explore this format...
		return DateTime.format(time, 'l');
	}

	return DateTime.fromNow(time);
}

const noGrouper = {
	grouper: () => true,
	getGroupInfo: () => ({label: '', className: cx('no-group'), itemListClassName: cx('no-group-item-list')})
};

const getGroupInfo = (label) => ({label, className: cx('group'), itemListClassName: cx('group-item-list'), labelClassName: cx('group-label')});

const SortToGrouper = {
	createdTime: {
		grouper: (obj) => {
			const created = new Date(obj.getCreatedTime());

			created.setHours(0, 0, 0, 0);

			return getTimeGroupHeader(created);
		},
		getGroupInfo
	},
	NewestDescendantCreatedTime: {
		grouper: (obj) => {
			const created = new Date(obj.getNewestDescendantCreatedTime());

			created.setHours(0, 0, 0, 0);

			return getTimeGroupHeader(created);
		},
		getGroupInfo
	}
};

export function getGrouperForSort (sort) {
	return SortToGrouper[sort] || noGrouper;
}