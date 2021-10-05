import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);

class DragHandle extends React.Component {
	static propTypes = {
		connect: PropTypes.func,
		pinned: PropTypes.bool,
	};

	render() {
		const { connect = x => x, pinned } = this.props;

		return connect(
			<div className={cx('drag-handle', { disabled: pinned })}>
				<i className={cx('icon-gripper')} />
			</div>
		);
	}
}

export default decorate(DragHandle, [Store.monitor(['pinned'])]);
