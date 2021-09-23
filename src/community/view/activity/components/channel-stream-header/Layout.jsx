import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Button } from '@nti/web-core';

import { Grid, List } from '../../Constants';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const OptionButton = styled(Button)`
	background: none;
	color: black;
	padding: 0;

	&.grid::after {
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
				<OptionButton onClick={this.selectGrid} grid plain>
					<i
						className={cx('option', 'icon-grid', {
							selected: layout === Grid,
						})}
					/>
				</OptionButton>
				<OptionButton onClick={this.selectList} plain>
					<i
						className={cx('option', 'icon-list', {
							selected: layout === List,
						})}
					/>
				</OptionButton>
			</div>
		);
	}
}
