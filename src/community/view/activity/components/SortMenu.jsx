import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import SelectMenu from './select-menu';

const t = scoped('nti-profile.community.activity.components.SortMenu', {
	header: 'Sort By',
	sortLabels: {
		'createdTime': 'Most Recent',
		'NewestDescendantCreatedTime': 'Recent Activity',
		'PostCount': 'Comment Count',
		'LikeCount': 'Like Count'
	}
});


ChannelSortMenu.getSortDisplay = (sort) => t(`sortLabels.${sort}`);
ChannelSortMenu.propTypes = {
	sortOn: PropTypes.string,
	setSortOn: PropTypes.func,
	availableSorts: PropTypes.arrayOf(PropTypes.string)
};
export default function ChannelSortMenu ({sortOn, setSortOn, availableSorts}) {
	if (!availableSorts || !availableSorts.length) { return null; }

	const options = availableSorts.map((value) => ({label: ChannelSortMenu.getSortDisplay(value), value}));

	return (
		<SelectMenu
			header={t('header')}
			options={options}
			selected={sortOn}
			select={setSortOn}
		/>
	);
}