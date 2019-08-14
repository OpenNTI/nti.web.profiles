import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import {Grid, List} from '../../Constants';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

export default class Layout extends React.PureComponent {
	static propTypes = {
		layout: PropTypes.oneOf([Grid, List]),
		setLayout: PropTypes.func
	}

	setLayout (layout) {
		const {setLayout} = this.props;

		if (setLayout) {
			setLayout(layout);
		}
	}

	selectGrid = () => this.setLayout(Grid)
	selectList = () => this.setLayout(List)

	render () {
		const {layout} = this.props;

		if (!layout) { return null; }


		return (
			<div className={cx('layout')}>
				<i className={cx('option', 'icon-grid', {selected: layout === Grid})} onClick={this.selectGrid} />
				<i className={cx('option', 'icon-list', {selected: layout === List})} onClick={this.selectList} />
			</div>
		);
	}
}