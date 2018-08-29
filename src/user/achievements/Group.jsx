import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Group extends React.Component {

	static propTypes = {
		className: PropTypes.string
	}

	render () {
		const {className, ...props} = this.props;

		return (
			<div className={cx('achievement-group', className)} {...props} />
		);
	}
}
