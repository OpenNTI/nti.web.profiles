import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default class Title extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<Header field="date" store={store}><span>Date</span></Header>
	);

	render () {
		return <div>{this.props.item.date}</div>;
	}
}
