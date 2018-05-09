import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Header from './Header';

const t = scoped('nti-web-profile.transcripts.table.columns.AggregateValue', {
	headerTitle: 'Amount'
});

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'value-col';

	static HeaderComponent = ({store}) => (
		<Header field="agg-value" store={store} sortKey="agg"><span>{t('headerTitle')}</span></Header>
	);

	render () {
		return <div>{parseFloat(Math.round(this.props.item.value * 100) / 100).toFixed(2) + ' ' + this.props.item.unit}</div>;
	}
}
