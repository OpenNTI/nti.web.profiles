import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);

export default
@Store.monitor(['pinned'])
class DragHandle extends React.Component {
	static propTypes = {
		pinned: PropTypes.bool
	}


	render () {
		const {pinned} = this.props;

		return (
			<div className={cx('drag-handle', {disabled: pinned})}>
				<i className={cx('icon-gripper')} />
			</div>
		);
	}
}