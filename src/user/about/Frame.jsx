import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Sidebar from './sidebar';

export default class Frame extends React.Component {

	static propTypes = {
		user: PropTypes.object,
		children: PropTypes.element
	}

	render () {
		const {children, user, ...props} = this.props;
		const child = React.Children.only(children);

		delete props.staticContext;

		return (
			<div className="profile-about-frame">
				{React.cloneElement(child, {...props, className: cx('profile-about-frame-content', child.props.className)})}
				<Sidebar user={user} />
			</div>
		);
	}
}
