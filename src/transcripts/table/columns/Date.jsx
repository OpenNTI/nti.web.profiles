import React from 'react';
import PropTypes from 'prop-types';
import {DateTime} from '@nti/web-commons';

import Header from './Header';

export default class Date extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static HeaderComponent = ({store}) => (
		<Header field="date" store={store}><span>Date</span></Header>
	);

	render () {
		const {date} = this.props.item;

		return <div>{date && DateTime.format(date, 'LL')}</div>;
	}
}
