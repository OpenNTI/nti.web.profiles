import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import LabelValueList from './LabelValueList';

const t = scoped(LOCALE_PATHS.DISTRICT, {
	title: 'District',
	district: 'District',
	teacherCertNumber: 'Teacher Certification',
	adminDistricts: 'Admin Districts'
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
		const {teacher_certification_number:cert} = user;

		if (!cert) { return null; }

		return {
			label: t('teacherCertNumber'),
			value: cert
		};
	},
	(user) => {
		const {admin_district_names:names} = user;

		if (!names || !names.length) { return null; }

		return {
			label: t('adminDistricts'),
			value: names.join(', ')
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
