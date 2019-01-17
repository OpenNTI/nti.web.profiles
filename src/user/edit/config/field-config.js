import {ensureArray as arr} from '../../../util';

const DEFAULT = Symbol('Default');
const FIELD_GROUPS = {
	[DEFAULT]: {
		about: [
			'about',
			'realname',
			'alias',
			'role',
			'email',
			'location',
			'home_page',
			'facebook',
			'instagram',
			'linkedIn',
			'twitter',
			'googlePlus'
		],
		education: 'education',
		positions: 'positions',
		interests: 'interests'
	},
	'ISALLTUserProfile': {
		about: [
			'about',
			'realname',
			'role',
			'location',
			'home_page',
			'facebook',
			'instagram',
			'linkedIn',
			'twitter',
			'googlePlus'
		],
		community: [
			'cultures',
			'initiatives',
			'church_community'
		],
		'Personality and Gifting': [
			'myers_briggs',
			'myers_briggs_response',
			'giant_5_voices',
			'giant_5_voices_response',
			'five_q',
			'five_q_response'
		],
		education: 'education',
		positions: 'positions',
		interests: 'interests'
	}
};


export function getFieldGroups (schema, type) {
	return FIELD_GROUPS[type] || FIELD_GROUPS[DEFAULT];
}

//flat array of all fields in the groups for a schema
export function getFields (schema, type) {
	const groups = getFieldGroups(schema, type);

	return Object.values(groups).reduce((acc, value) => [...acc, ...arr(value)], []);
}
