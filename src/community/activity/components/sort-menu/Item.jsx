import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './Style.css';

const cx = classnames.bind(Styles);

export default class SortItem extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string,
		sort: PropTypes.string,
		selected: PropTypes.bool,
		setSort: PropTypes.func
	}

	onSelectSort = () => {
		const {setSort, selected, sort} = this.props;

		if (!selected && setSort) {
			setSort(sort);
		}
	}


	render () {
		const {label, selected} = this.props;
		
		return (
			<div className={cx('sort-menu-item', {selected})} onClick={this.onSelectSort}>
				{selected && (<i className={cx('icon-check', 'check-mark')} />)}
				<Text.Base className={cx('label')}>{label}</Text.Base>
			</div>
		);	
	}
}