import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<Header field="value" store={store}><span>Value</span></Header>
	);

	render () {
		return <div>{this.props.item.value}</div>;
	}
}
