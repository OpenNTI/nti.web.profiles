import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Styles from './Style.css';
import Item from './Item';

const cx = classnames.bind(Styles);
const t = scoped('nti-profile.community.activity.components.sort-menu.View', {
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
	sort: PropTypes.string,
	setSort: PropTypes.func,
	availableSorts: PropTypes.arrayOf(PropTypes.string)
};
export default function ChannelSortMenu ({sort, setSort, availableSorts}) {
	return (
		<div className={cx('sort-menu')}>
			<Text.Base className={cx('header')}>
				{t('header')}
			</Text.Base>
			<ul className={cx('sort-menu')}>
				{availableSorts.map((sortOption, index) => {
					return (
						<li key={index}>
							<Item
								label={ChannelSortMenu.getSortDisplay(sortOption)}
								sort={sortOption}
								selected={sortOption === sort}
								setSort={setSort}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}