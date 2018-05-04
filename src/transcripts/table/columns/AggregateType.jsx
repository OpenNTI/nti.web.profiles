import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Header from './Header';

const t = scoped('nti-web-profile.transcripts.table.columns.AggregateType', {
	headerTitle: 'Type'
});

export default class Type extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'type-col';

	static HeaderComponent = ({store}) => (
		<Header field="agg-type" store={store} sortKey="agg"><span>{t('headerTitle')}</span></Header>
	);

	render () {
		return <div>{this.props.item.type}</div>;
	}
}
