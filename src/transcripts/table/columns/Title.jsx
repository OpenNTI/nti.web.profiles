import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<div>Title</div>
	);

	render () {
		return <div>{this.props.item.title}</div>;
	}
}
