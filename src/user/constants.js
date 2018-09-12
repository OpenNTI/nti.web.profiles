const LOCALE_ROOT = 'nti-web-profile.user-profile';
const LOCALE_KEYS = [
	'NAV',
	'ABOUT',
	'EDIT',
	'PROFESSIONAL',
	'EDUCATION',
	'INTERESTS'
];

export const LOCALE_PATHS = {
	ROOT: LOCALE_ROOT,
	...LOCALE_KEYS.reduce((result, key) => ({...result, [key]: [LOCALE_ROOT, key].join('.')}), {})
};
