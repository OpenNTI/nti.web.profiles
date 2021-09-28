import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Button } from '@nti/web-core';

import { Grid, List } from '../../Constants';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const Option = styled(Button).attrs({ plain: true })`
	background: none;
	color: black;
	padding: 0;
	position: relative;
	&:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 17px;
		bottom: 17px;
		left: auto;
		right: 0;
		width: 1px;
		opacity: 0.2;
		background: var(--secondary-grey-alt);
	}
`;

export default class Layout extends React.PureComponent {
	static propTypes = {
		layout: PropTypes.oneOf([Grid, List]),
		setLayout: PropTypes.func,
	};

	setLayout(layout) {
		const { setLayout } = this.props;

		if (setLayout) {
			setLayout(layout);
		}
	}

	selectGrid = () => this.setLayout(Grid);
	selectList = () => this.setLayout(List);

	render() {
		const { layout } = this.props;

		if (!layout) {
			return null;
		}

		return (
			<div className={cx('layout')}>
				<Option onClick={this.selectGrid}>
					<i
						className={cx('option', 'icon-grid', {
							selected: layout === Grid,
						})}
					/>
				</Option>
				<Option onClick={this.selectList}>
					<i
						className={cx('option', 'icon-list', {
							selected: layout === List,
						})}
					/>
				</Option>
			</div>
		);
	}
}
