import './Education.scss';
import React from 'react';
import { scoped } from '@nti/lib-locale';

import Experience from './Experience';

const t = scoped('nti-web-profile.user-profile.edit.education.fields', {
	school: 'School',
	degree: 'Degree',
});

const FIELDMETA = {
	organization: {
		name: 'school',
	},
	role: {
		name: 'degree',
	},
};

export default function Education(props) {
	return <Experience {...props} fieldMeta={FIELDMETA} localizer={t} />;
}

Education.createEmpty = () => ({
	MimeType: 'application/vnd.nextthought.profile.educationalexperience',
});
