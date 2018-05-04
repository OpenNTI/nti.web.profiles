import React from 'react';
import PropTypes from 'prop-types';
import {Loading, Table} from '@nti/web-commons';

import AggregateTypeColumn from '../columns/AggregateType';
import AggregateValueColumn from '../columns/AggregateValue';


const columns = [
	AggregateTypeColumn,
	AggregateValueColumn
];

export default class AggregateTranscriptTable extends React.Component {
	propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		loading: PropTypes.bool,
		aggregateItems: PropTypes.arrayOf(PropTypes.object)
	}

	componentDidMount () {
		this.props.store.loadTranscript();
	}

	render () {
		if(this.props.loading) {
			return <Loading.Ellipsis/>;
		}

		return (
			<div className="nti-profile-transcripts-table aggregate">
				<Table.Table items={this.props.aggregateItems} columns={columns} store={this.props.store}/>
			</div>
		);
	}
}
