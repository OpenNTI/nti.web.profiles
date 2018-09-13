import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './sidebar';

export default class Frame extends React.Component {

	static propTypes = {
		user: PropTypes.object,
		children: PropTypes.element
	}

	render () {
		const {children, user, ...props} = this.props;

		delete props.staticContext;

		return (
			<div className="profile-about-frame">
				{React.cloneElement(React.Children.only(children), {...props})}
				<Sidebar user={user} />
			</div>
		);
	}
}
