import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {DateTime} from '@nti/web-commons';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import LabelValueList from './LabelValueList';

//For OPSRC

const t = scoped(LOCALE_PATHS.DISTRICT, {
	title: 'Information',
	district: 'District',
	teacherCertNumber: 'Teacher Certification',
	adminDistricts: 'Admin Districts',
	districtSite: 'District Site',
	jobTitle: 'Job Title',
	workEmail: 'Work Email',
	otherRole: 'Other Role',
	companyName: 'Company Name',
	companyMailingAddress: 'Company Mailing Address',
	expectedGraduation: 'Expected Graduation Date'
});

const propertyGetter = (property, label) => {
	return (user) => {
		const value = user[property];

		if (!value) { return null; }

		return {label, value};
	};
};

const FIELDS = [
	(user) => {
		const {affiliation}  = user;

		if (!affiliation) { return null; }

		return {
			label: t('district'),
			value: affiliation
		};
	},
	(user) => {
		const {teacher_certification_number:cert, teacher_certification:hasCert} = user;

		if (!cert || !hasCert) { return null; }

		return {
			label: t('teacherCertNumber'),
			value: cert
		};
	},
	(user) => {
		const {admin_district_names:names, is_district_admin:isAdmin} = user;

		if (!isAdmin || !names || !names.length) { return null; }

		return {
			label: t('adminDistricts'),
			value: names.join(', ')
		};
	},
	(user) => {
		const {district_school:site} = user;

		if (!site) { return null; }

		return {
			label: t('districtSite'),
			value: site
		};
	},
	propertyGetter('job_title', t('jobTitle')),
	propertyGetter('other_role', t('otherRole')),
	propertyGetter('work_email', t('workEmail')),
	propertyGetter('company_name', t('compnayName')),
	propertyGetter('company_mailing_address', t('companyMailingAddress')),
	(user) => {
		const {expected_graduation: date} = user;

		if (!date) { return null; }

		return {
			label: t('expectedGraduation'),
			value: DateTime.format(date, 'MMMM YYYY')
		};
	}
];


export default class ProfileDistrictInfo extends React.Component {
	static shouldShow (user) {
		return FIELDS.map(field => field(user)).filter(field => !!field).length > 0;
	}

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;
		const fields = FIELDS.map(field => field(user)).filter(field => !!field);

		return (
			<Card className="user-profile-about-district" title={t('title')}>
				<LabelValueList values={fields} />
			</Card>
		);
	}
}
