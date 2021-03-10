import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import Styles from './Style.css';
import Item from './Item';

const cx = classnames.bind(Styles);
const t = scoped('nti-profile.community.activity.components.sort-menu.View', {
	header: 'Sort By',
	sortLabels: {
		createdTime: 'Most Recent',
		NewestDescendantCreatedTime: 'Recent Activity',
		PostCount: 'Comment Count',
		LikeCount: 'Like Count',
	},
});

ChannelSelectMenu.getSortDisplay = sort => t(`sortLabels.${sort}`);
ChannelSelectMenu.propTypes = {
	header: PropTypes.string,

	selected: PropTypes.string,
	select: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		})
	),
};
export default function ChannelSelectMenu({
	header,
	selected,
	select,
	options,
}) {
	return (
		<div className={cx('select-menu')}>
			<Text.Base className={cx('header')}>{t('header')}</Text.Base>
			<ul>
				{options.map((option, index) => {
					return (
						<li key={index}>
							<Item
								option={option}
								selected={selected === option.value}
								select={select}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
