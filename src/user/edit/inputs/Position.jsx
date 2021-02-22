import './Position.scss';
import React from 'react';
import { scoped } from '@nti/lib-locale';

import Experience from './Experience';

const t = scoped('nti-web-profile.user-profile.edit.position.fields', {
	companyName: 'Company',
	title: 'Title',
});

const FIELDMETA = {
	organization: {
		name: 'companyName',
	},
	role: {
		name: 'title',
	},
};

export default function Position(props) {
	return <Experience {...props} fieldMeta={FIELDMETA} localizer={t} />;
}

Position.createEmpty = () => ({
	MimeType: 'application/vnd.nextthought.profile.professionalposition',
});
