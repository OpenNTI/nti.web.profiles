import {ensureArray as arr} from '../../../util';

// group name => fields
const fieldGroups = {
	role: 'role',
	about: [
		'about',
		'realname',
		'alias',
		'email',
		'location',
		'home_page',
		'facebook',
		'linkedIn',
		'twitter',
		'googlePlus'
	],
	education: 'education',
	positions: 'positions',
	interests: 'interests'
};

export default fieldGroups;

// flat array of all fields in fieldGroups
export const fields = Object.values(fieldGroups).reduce((acc, value) => [...acc, ...arr(value)], []);
