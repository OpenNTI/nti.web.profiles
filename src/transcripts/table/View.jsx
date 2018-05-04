import React from 'react';
import PropTypes from 'prop-types';
import {Loading, Table} from '@nti/web-commons';

import TitleColumn from './columns/Title';
import DateColumn from './columns/Date';
import TypeColumn from './columns/Type';
import ValueColumn from './columns/Value';


const columns = [
	TitleColumn,
	DateColumn,
	TypeColumn,
	ValueColumn
];

export default class TranscriptsView extends React.Component {
	propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		loading: PropTypes.bool,
		items: PropTypes.arrayOf(PropTypes.object)
	}

	componentDidMount () {
		this.props.store.loadTranscript();
	}

	render () {
		if(this.props.loading) {
			return <Loading.Ellipsis/>;
		}

		return (
			<div className="nti-profile-transcripts-table">
				<Table.Table items={this.props.items} columns={columns} store={this.props.store}/>
			</div>
		);
	}
}
