import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Header from './Header';

const t = scoped('nti-web-profile.transcripts.table.columns.Value', {
	headerTitle: 'Amount',
	total: 'Total'
});

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'value-col';

	static HeaderComponent = ({store}) => (
		<Header field="value" store={store}><span>{t('headerTitle')}</span></Header>
	);

	static FooterComponent = ({store}) => {
		const renderFn = v => <Value item={v}/>;

		return (
			<div className="value-footer">
				<div className="title">{t('total')}</div>
				<div className="values">{store.getAggregateValues().map(renderFn)}</div>
			</div>
		);
	};

	render () {
		return <div>{parseFloat(Math.round(this.props.item.value * 100) / 100).toFixed(2) + ' ' + this.props.item.unit}</div>;
	}
}
