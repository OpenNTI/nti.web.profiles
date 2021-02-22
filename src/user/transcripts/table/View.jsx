import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Table } from '@nti/web-commons';

import TitleColumn from './columns/Title';
import DateColumn from './columns/Date';
import TypeColumn from './columns/Type';
import ValueColumn from './columns/Value';
import OptionsColumn from './columns/Options';

const columns = [
	TitleColumn,
	DateColumn,
	TypeColumn,
	ValueColumn,
	OptionsColumn,
];

export default class TranscriptTable extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		loading: PropTypes.bool,
		items: PropTypes.arrayOf(PropTypes.object),
	};

	render() {
		if (this.props.loading) {
			return <Loading.Ellipsis />;
		}

		return (
			<div className="nti-profile-transcripts-table">
				<Table.Table
					items={this.props.items}
					columns={columns}
					store={this.props.store}
				/>
			</div>
		);
	}
}
