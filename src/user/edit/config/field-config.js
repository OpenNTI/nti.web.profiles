import {ensureArray as arr} from '../../../util';

const OSDEBase = {
	about: [
		'about',
		'realname',
		'alias',
		'email',
		'location',
		'home_page',
		'facebook',
		'instagram',
		'linkedIn',
		'twitter'
	],
	education: 'education',
	positions: 'positions',
	interests: 'interests'
};

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
			'twitter'
		],
		education: 'education',
		positions: 'positions',
		interests: 'interests'
	},
	'ISALLTUserProfile': {
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
			'twitter'
		],
		community: [
			'cultures',
			'city_interest',
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
	},
	'IOPSRCUserProfile': {
		about: [
			'about',
			'realname',
			'alias',
			'email',
			'location',
			'home_page',
			'facebook',
			'instagram',
			'linkedIn',
			'twitter'
		],
		information: [
			'role',
			'teacher_certification',
			'teacher_certification_number',
			'affiliation',
			'district_school',
			'is_district_admin',
			'admin_district_names'
		],
		education: 'education',
		positions: 'positions',
		interests: 'interests'
	},
	'IOSDEStudentProfile': {
		information: ['role', 'expected_graduation', 'affiliation'],
		...OSDEBase
	},
	'IOSDEOtherProfile': {
		information: ['role', 'other_role'],
		...OSDEBase
	},
	'IOSDEEmployerProfile': {
		information: ['role', 'company_name', 'company_mailing_address', 'work_email'],
		...OSDEBase
	},
	'IOSDENurseProfile': {
		information: ['role', 'affiliation', 'work_email'],
		...OSDEBase
	},
	'IOSDEStaffProfile': {
		information: ['role', 'affiliation', 'job_title', 'work_email'],
		...OSDEBase
	},
	'IOSDEAdminProfile': 'IOSDEStaffProfile',
	'IOSDEEducatorProfile': 'IOSDEStaffProfile'
};


export function getFieldGroups (schema, type) {
	const fieldGroups = FIELD_GROUPS[type] || FIELD_GROUPS[DEFAULT];

	if (typeof fieldGroups === 'string') {
		return FIELD_GROUPS[fieldGroups] || FIELD_GROUPS[DEFAULT];
	}

	return fieldGroups;
}

//flat array of all fields in the groups for a schema
export function getFields (schema, type) {
	const groups = getFieldGroups(schema, type);

	return Object.values(groups).reduce((acc, value) => [...acc, ...arr(value)], []);
}
