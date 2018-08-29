import React from 'react';
import {bool, string, array} from 'prop-types';
import cx from 'classnames';
import {Loading} from '@nti/web-commons';

import Badge from './Badge';

export default class BadgeList extends React.Component {

	static propTypes = {
		loading: bool,
		title: string,
		empty: string,
		className: string,
		items: array
	}

	renderBadges () {
		const {items = [], empty} = this.props;

		return items.length === 0 ? (
			<div className="empty-state">{empty}</div>
		) : (
			<ul className="badge-list">
				{items.map((item, index) => (
					<li key={index}>
						<Badge item={item} />
					</li>
				))}
			</ul>
		);
	}

	render () {
		const {loading, title, className} = this.props;

		return (
			<div className={cx('items-container', className)}>
				<div className="subtitle">
					{title}
				</div>
				{loading ? <Loading.Ellipsis /> : this.renderBadges()}
			</div>
		);
	}
}
