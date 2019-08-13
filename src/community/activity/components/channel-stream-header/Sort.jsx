import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Flyout, Text} from '@nti/web-commons';

import SortMenu from '../sort-menu';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

Sort.propTypes = {
	sort: PropTypes.string,
	availableSorts: PropTypes.arrayOf(PropTypes.string)
};
export default function Sort (props) {
	const {sort, availableSorts} = props;

	if (!availableSorts || !availableSorts.length) { return null; }

	const trigger = (
		<div className={cx('sort-flyout')}>
			<Text.Base className={cx('label')}>{SortMenu.getSortDisplay(sort)}</Text.Base>
			<i className={cx('icon', 'icon-chevron-down-10')} />
		</div>
	);

	return (
		<Flyout.Triggered
			trigger={trigger}
			verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			sizing={Flyout.SIZES.MATCH_SIDE}
		>
			<SortMenu {...props} />
		</Flyout.Triggered>
	);
}