import React from 'react';
import { render } from '@testing-library/react';

import { scoped } from '@nti/lib-locale';

import Experience from '../Experience';

import { standardSchema } from './schemas';

const COMPANY_ALIAS = 'some company';
const TITLE_ALIAS = 'fake title';

const t = scoped('nti-web-profile.user-profile.edit.experience.Test', {
	companyName: COMPANY_ALIAS,
	title: TITLE_ALIAS,
});

const FIELD_META = {
	organization: {
		name: 'companyName',
	},
	role: {
		name: 'title',
	},
};

/* eslint-env jest */
describe('Profile experience editor tests', () => {
	function verifyContainer(container, name, label, required) {
		const inputEl = container.querySelector('input');
		const labelEl = container.querySelector('.nti-profile-field-label');

		expect(labelEl.textContent).toEqual(label);
		expect(inputEl.getAttribute('name')).toEqual(name);

		if (required) {
			expect(container.getAttribute('class')).toMatch(/required/);
		} else {
			expect(container.getAttribute('class')).not.toMatch(/required/);
		}
	}

	test('Standard schema (organization required, others optional)', async () => {
		const result = render(
			<Experience
				schema={standardSchema}
				fieldMeta={FIELD_META}
				localizer={t}
			/>
		);

		const fieldContainers = result.container.querySelectorAll(
			'.nti-profile-field-container'
		);

		for (const container of fieldContainers) {
			const className = container.getAttribute('class');

			if (className.match(/organization/)) {
				verifyContainer(container, 'companyName', COMPANY_ALIAS, true);
			} else if (className.match(/role/)) {
				verifyContainer(container, 'title', TITLE_ALIAS, false);
			} else if (className.match(/startYear/)) {
				verifyContainer(container, 'startYear', 'Start Year', false);
			} else if (className.match(/endYear/)) {
				verifyContainer(container, 'endYear', 'End Year', false);
			} else if (className.match(/description/)) {
				expect(container.querySelector('.nti-draft-core')).toBeTruthy();
			}
		}
	});
});
