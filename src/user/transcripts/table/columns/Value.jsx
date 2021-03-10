import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

import Header from './Header';
import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Value', {
	headerTitle: 'Amount',
	total: 'Total',
});

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		nonViewable: PropTypes.bool,
	};

	static cssClassName = 'value-col';

	static HeaderComponent = ({ store }) => (
		<Header field="value" store={store}>
			<span>{t('headerTitle')}</span>
		</Header>
	);

	// static FooterComponent = ({store}) => {
	// 	const renderFn = v => { return v.creditDefinition && <Value key={v.creditDefinition.type + '-' + v.creditDefinition.unit} item={v} nonViewable/>; };
	//
	// 	return (
	// 		<div className="value-footer">
	// 			<div className="title">{t('total')}</div>
	// 			<div className="values">{store.getAggregateValues().map(renderFn)}</div>
	// 		</div>
	// 	);
	// };

	renderContent() {
		const { item } = this.props;

		if (item.isAddRow) {
			return null;
		}

		return (
			<div>
				{parseFloat(Math.round(item.amount * 100) / 100).toFixed(2) +
					' ' +
					item.creditDefinition.unit}
			</div>
		);
	}

	render() {
		const { item, nonViewable } = this.props;

		if (nonViewable) {
			return this.renderContent();
		}

		return (
			<DetailViewable item={item}>{this.renderContent()}</DetailViewable>
		);
	}
}
