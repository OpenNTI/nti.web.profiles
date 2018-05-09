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
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'type-col';

	static HeaderComponent = ({store}) => (
		<Header field="type" store={store}><span>{t('headerTitle')}</span></Header>
	);

	static FooterComponent = ({store}) => {
		const renderFn = v => <Type item={v}/>;

		return (
			<div className="type-footer">
				<div className="title"/>
				<div className="values">{store.getAggregateValues().map(renderFn)}</div>
			</div>
		);
	};

	render () {
		return <DetailViewable item={this.props.item}><div>{this.props.item.creditDefinition.type}</div></DetailViewable>;
	}
}
