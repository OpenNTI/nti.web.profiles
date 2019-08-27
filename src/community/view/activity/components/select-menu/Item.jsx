import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './Style.css';

const cx = classnames.bind(Styles);

export default class SortItem extends React.PureComponent {
	static propTypes = {
		option: PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string
		}),
		selected: PropTypes.bool,
		select: PropTypes.func
	}

	onSelect = () => {
		const {select, selected, option} = this.props;

		if (!selected && select) {
			select(option.value);
		}
	}


	render () {
		const {option, selected} = this.props;
		
		return (
			<div className={cx('select-menu-item', {selected})} onClick={this.onSelect}>
				{selected && (<i className={cx('icon-check', 'check-mark')} />)}
				<Text.Base>{option.label}</Text.Base>
			</div>
		);	
	}
}