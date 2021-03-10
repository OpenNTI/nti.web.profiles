import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

import { List, Grid } from '../Constants';

import SelectMenu from './select-menu';

const t = scoped('nti-profile.community.activity.components.LayoutMenu', {
	header: 'Layout',
	layoutLabels: {
		grid: 'Grid Layout',
		list: 'List Layout',
	},
});

LayoutMenu.propTypes = {
	layout: PropTypes.string,
	setLayout: PropTypes.func,
};
export default function LayoutMenu({ layout, setLayout }) {
	const options = [
		{ label: t('layoutLabels.grid'), value: Grid },
		{ label: t('layoutLabels.list'), value: List },
	];

	return (
		<SelectMenu
			header={t('header')}
			options={options}
			selected={layout}
			select={setLayout}
		/>
	);
}
