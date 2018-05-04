import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<Header field="value" store={store}><span>Amount</span></Header>
	);

	render () {
		return <div>{parseFloat(Math.round(this.props.item.value * 100) / 100).toFixed(2)}</div>;
	}
}
