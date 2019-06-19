import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import LabelValueList from './LabelValueList';

//For OPSRC

const t = scoped(LOCALE_PATHS.DISTRICT, {
	title: 'Information',
	district: 'District',
	teacherCertNumber: 'Teacher Certification',
	adminDistricts: 'Admin Districts',
	districtSite: 'District Site'
});

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
