import React from 'react';
import {scoped} from '@nti/lib-locale';

import Experience from './Experience';

const t = scoped('nti-web-profile.user-profile.edit.position.fields', {
	companyName: 'Company',
	title: 'Title'
});

const FIELDMAP = {
	role: 'title',
	organization: 'companyName'
};

export default function Position (props) {
	return (
		<Experience {...props} fieldMap={FIELDMAP} localizer={t} />
	);
}

Position.createEmpty = () => ({
	MimeType: 'application/vnd.nextthought.profile.professionalposition'
});
