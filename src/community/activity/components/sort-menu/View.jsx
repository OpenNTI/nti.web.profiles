import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

const t = scoped('nti-profile.community.activity.components.sort-menu.View', {
	sortLabels: {
		'createdTime': 'Most Recent',
		'NewestDescendantCreatedTime': 'Recent Activity',
		'PostCount': 'Comment Count',
		'LikeCount': 'Like Count'
	}
});


ChannelSortMenu.getSortDisplay = (sort) => t(`sortLabels.${sort}`);
ChannelSortMenu.propTypes = {
	sort: PropTypes.string,
	setSort: PropTypes.func,
	availableSorts: PropTypes.arrayOf(PropTypes.string)
};
export default function ChannelSortMenu ({sort, setSort, availableSorts}) {
	return (
		<div>
			Sort Menu
		</div>
	);
}