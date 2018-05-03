import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


export default class Header extends React.Component {
	static propTypes = {
		store: PropTypes.object,
		field: PropTypes.string,
		children: PropTypes.any
	}

	sort = () => {
		const {store, field} = this.props;
		return store && store.setSortOn(field);
	}


	render () {
		const {store, field, children} = this.props;
		const isSorted = store && store.getSortOn() === field;
		const direction = store && store.getSortOrder();

		const classes = cx(
			'sortable',
			{
				sorted: isSorted,
				asc: isSorted && direction === 'ascending',
				desc: isSorted && direction === 'descending',
			}
		);

		return (
			<div onClick={this.sort} className={classes}><span>{children}</span>{isSorted ? direction === 'ascending' ? <i className="icon-chevron-down"/> : <i className="icon-chevron-up"/> : null}</div>
		);
	}
}
