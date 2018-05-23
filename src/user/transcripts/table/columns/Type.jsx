import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Header from './Header';
import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Type', {
	headerTitle: 'Type'
});

export default class Type extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		nonViewable: PropTypes.bool
	}

	static cssClassName = 'type-col';

	static HeaderComponent = ({store}) => (
		<Header field="type" store={store}><span>{t('headerTitle')}</span></Header>
	);

	// static FooterComponent = ({store}) => {
	// 	const renderFn = v => { return v.creditDefinition && <Type key={v.creditDefinition.type + '-' + v.creditDefinition.unit} item={v} nonViewable/>; };
	//
	// 	return (
	// 		<div className="type-footer">
	// 			<div className="title"/>
	// 			<div className="values">{store.getAggregateValues().map(renderFn)}</div>
	// 		</div>
	// 	);
	// };

	renderContent () {
		const {creditDefinition} = this.props.item;
		return <div>{creditDefinition && creditDefinition.type}</div>;
	}

	render () {
		const {nonViewable, item} = this.props;

		if(nonViewable) {
			return this.renderContent();
		}

		return <DetailViewable item={item}>{this.renderContent()}</DetailViewable>;
	}
}
