import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);

export default
@Store.monitor(['delete', 'canDelete'])
class DeleteChannel extends React.Component {
	static propTypes = {
		delete: PropTypes.func,
		canDelete: PropTypes.bool
	}

	render () {
		const {delete: doDelete, canDelete} = this.props;

		return (
			<button type="button" className={cx('delete', {disabled: !canDelete})} onClick={canDelete ? doDelete : null}>
				<i className="icon-light-x" />
			</button>
		);
	}
}