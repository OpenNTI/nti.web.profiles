import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button } from '@nti/web-core';

export default class Header extends React.Component {
	static propTypes = {
		store: PropTypes.object,
		field: PropTypes.string,
		sortKey: PropTypes.string,
		children: PropTypes.any,
	};

	sort = () => {
		const { store, sortKey, field } = this.props;
		return store && store.setSortOn(field, sortKey);
	};

	render() {
		const { store, field, sortKey, children } = this.props;
		const isSorted = store && store.getSortOn(sortKey) === field;
		const direction = store && store.getSortOrder(sortKey);

		const classes = cx('sortable', {
			sorted: isSorted,
			asc: isSorted && direction === 'ascending',
			desc: isSorted && direction === 'descending',
		});

		return (
			<Button onClick={this.sort} className={classes} plain>
				<span>{children}</span>
				{isSorted ? (
					direction === 'ascending' ? (
						<i className="icon-chevron-down" />
					) : (
						<i className="icon-chevron-up" />
					)
				) : null}
			</Button>
		);
	}
}
