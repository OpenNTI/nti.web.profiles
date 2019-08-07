import {scoped} from '@nti/lib-locale';

const t = scoped('nti-profiles.ProfileUpdate.types.default.Config', {
	opsrc: {
		adminLabel: 'Administrator',
		teacherLabel: 'Teacher Certification'
	}
});

const TYPE_TO_CONFIG = {
	'IOPSRCUserProfile': {
		groups: [
			{
				fields: [
					'email',
					'role',
					'affiliation',
					'district_school'
				]
			},
			{
				getLabel: () => t('opsrc.teacherLabel'),
				fields: [
					'teacher_certification',
					'teacher_certification_number'
				]
			},
			{
				getLabel: () => t('opsrc.adminLabel'),
				fields: [
					'is_district_admin',
					'admin_district_names'
				]
			}
		]
	}
};


export function getConfigForType (type) {
	return TYPE_TO_CONFIG[type];
}
