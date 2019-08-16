import React from 'react';
import PropTypes from 'prop-types';

export default class CommunityFrame extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		community: PropTypes.object
	}

	render () {
		const {children, community} = this.props;

		return (
			<>
				{React.Children.map(children, (item) => {
					return React.cloneElement(item, {community});
				})}
			</>
		);
	}
}