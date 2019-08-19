import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LockScroll, Text} from '@nti/web-commons';

import Styles from './OptionsWindow.css';
import LayoutMenu from './LayoutMenu';
import SortMenu from './SortMenu';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.activity.components.OptionsWindow', {
	header: 'Options'
});

export default class OptionsWindow extends React.PureComponent {
	static propTypes = {
		onDismiss: PropTypes.func,
		fullscreen: PropTypes.bool,

		layout: PropTypes.string,
		setLayout: PropTypes.func,

		availableSorts: PropTypes.arrayOf(PropTypes.string),
		sortOn: PropTypes.string,
		setSortOn: PropTypes.func
	}


	close = () => {
		const {onDismiss} = this.props;

		if (onDismiss) {
			onDismiss();
		}
	}


	setSortOn = (sortOn) => {
		const {setSortOn} = this.props;

		if (setSortOn) {
			setSortOn(sortOn);
		}

		this.close();
	}


	setLayout = (layout) => {
		const {setLayout} = this.props;

		if (setLayout) {
			setLayout(layout);
		}

		this.close();
	}

	render () {
		const {fullscreen, layout, sortOn, availableSorts} = this.props;

		return (
			<section className={cx('options-window', {fullscreen})}>
				{fullscreen && (<LockScroll />)}
				<div className={cx('header-bar')}>
					<i className={cx('icon-light-x', 'close')} onClick={this.close} />
					<Text.Base className={cx('header')}>{t('header')}</Text.Base>
					<span className={cx('gap')} />
				</div>
				<LayoutMenu layout={layout} setLayout={this.setLayout} />
				<SortMenu sortOn={sortOn} availableSorts={availableSorts} setSortOn={this.setSortOn} />
			</section>
		);
	}
}
