import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default class Type extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<Header field="type" store={store}><span>Type</span></Header>
	);

	render () {
		return <div>{this.props.item.type}</div>;
	}
}
