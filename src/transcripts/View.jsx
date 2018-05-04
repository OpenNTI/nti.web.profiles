import React from 'react';
import PropTypes from 'prop-types';
import {Flyout} from '@nti/web-commons';

import Store from './Store';
import Table from './table/View';
import DateFilter from './table/filters/Date';
import TypeFilter from './table/filters/Type';

export default
@Store.connect({
	loading: 'loading',
	dateFilter: 'dateFilter',
	typeFilter: 'typeFilter',
	items: 'items'
})
class TranscriptsView extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		dateFilter: PropTypes.object,
		typeFilter: PropTypes.string
	}

	state = {}

	attachFlyoutRef = x => this.flyout = x

	renderDownloadTrigger () {
		return <div className="download">Download</div>;
	}

	downloadCSV = () => {
		// TODO: Get download CSV link from transcript

		this.flyout.dismiss();
	}

	downloadPDF = () => {
		// TODO: Get download PDF link from transcript

		this.flyout.dismiss();
	}

	onDateFilterChange = (dateFilterValue) => {
		const {store} = this.props;

		store.setDateFilter(dateFilterValue);
	}

	onTypeFilterChange = (typeFilterValue) => {
		const {store} = this.props;

		store.setTypeFilter(typeFilterValue);
	}

	render () {
		return (
			<div className="nti-profile-transcripts">
				<div className="top-controls">
					<div className="filters">
						<DateFilter onChange={this.onDateFilterChange} filterValue={this.props.dateFilter}/>
						<TypeFilter store={this.props.store} onChange={this.onTypeFilterChange} filterValue={this.props.typeFilter}/>
					</div>
					<Flyout.Triggered
						className="transcript-download"
						trigger={this.renderDownloadTrigger()}
						horizontalAlign={Flyout.ALIGNMENTS.LEFT}
						sizing={Flyout.SIZES.MATCH_SIDE}
						ref={this.attachFlyoutRef}
					>
						<div>
							<div className="download-option" onClick={this.downloadCSV}>CSV</div>
							<div className="download-option" onClick={this.downloadPDF}>PDF</div>
						</div>
					</Flyout.Triggered>
				</div>
				<Table {...this.props}/>
			</div>
		);
	}
}
