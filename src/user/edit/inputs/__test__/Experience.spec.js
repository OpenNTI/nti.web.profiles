import React from 'react';
import { mount } from 'enzyme';
import {scoped} from '@nti/lib-locale';

import Experience from '../Experience';

import {standardSchema} from './schemas';

const COMPANY_ALIAS = 'some company';
const TITLE_ALIAS = 'fake title';

const t = scoped('nti-web-profile.user-profile.edit.experience.Test', {
	companyName: COMPANY_ALIAS,
	title: TITLE_ALIAS
});


const FIELDMETA = {
	organization: {
		name: 'companyName'
	},
	role: {
		name: 'title',
	},
};

/* eslint-env jest */
describe('Profile experience editor tests', () => {
	function verifyContainer (container, name, label, required) {
		const inputEl = container.find('input').first();
		const labelEl = container.find('.nti-profile-field-label').first();

		expect(labelEl.text()).toEqual(label);
		expect(inputEl.prop('name')).toEqual(name);

		if(required) {
			expect(container.prop('className')).toMatch(/required/);
		}
		else {
			expect(container.prop('className')).not.toMatch(/required/);
		}
	}

	test('Standard schema (organization required, others optional)', async () => {
		const cmp = mount(<Experience schema={standardSchema} fieldMeta={FIELDMETA} localizer={t}/>);

		const fieldContainers = cmp.find('.nti-profile-field-container');

		expect(fieldContainers.at(0).prop('className')).toMatch(/required/);

		fieldContainers.forEach((container) => {
			const className = container.prop('className');

			if(className.match(/organization/)) {
				verifyContainer(container, 'companyName', COMPANY_ALIAS, true);
			}
			else if(className.match(/role/)) {
				verifyContainer(container, 'title', TITLE_ALIAS, false);
			}
			else if(className.match(/startYear/)) {
				verifyContainer(container, 'startYear', 'Start Year', false);
			}
			else if(className.match(/endYear/)) {
				verifyContainer(container, 'endYear', 'End Year', false);
			}
			else if(className.match(/description/)) {
				expect(container.find('.nti-draft-core').exists()).toBe(true);
			}
		});
	});
});
