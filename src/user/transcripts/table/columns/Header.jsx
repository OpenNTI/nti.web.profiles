import React from 'react';
import cx from 'classnames';

import { Button } from '@nti/web-core';
import { useStoreValue } from '@nti/lib-store';

export default function Header({ field, sortKey, children }) {
	const { getSortOn, getSortOrder } = useStoreValue();
	const sort = () => {
		const { store, sortKey, field } = this.props;
		return store && store.setSortOn(field, sortKey);
	};

	const isSorted = getSortOn?.(sortKey) === field;
	const direction = getSortOrder?.(sortKey);

	const classes = cx('sortable', {
		sorted: isSorted,
		asc: isSorted && direction === 'ascending',
		desc: isSorted && direction === 'descending',
	});

	return (
		<Button onClick={sort} className={classes} plain>
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
