import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';

export default class Frame extends React.Component {

	static propTypes = {
		children: PropTypes.element
	}

	render () {
		const {children, ...props} = this.props;

		return (
			<div className="profile-about-frame">
				{React.cloneElement(React.Children.only(children), {...props})}
				<Sidebar {...props} />
			</div>
		);
	}
}
