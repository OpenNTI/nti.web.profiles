import React from 'react';
import PropTypes from 'prop-types';
import {Flyout} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Store from './Store';
import Table from './table/View';
import DateFilter from './table/filters/Date';
import TypeFilter from './table/filters/Type';

const t = scoped('nti-web-profile.transcripts.View', {
	aggregate: 'Summary',
	detailed: 'Detailed',
	csv: 'CSV',
	pdf: 'PDF',
	download: 'Download'
});

export default
@Store.connect({
	loading: 'loading',
	dateFilter: 'dateFilter',
	typeFilter: 'typeFilter',
	items: 'items',
	aggregateItems: 'aggregateItems'
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

	componentDidMount () {
		const {entity, store} = this.props;

		store.loadTranscript(entity);
	}

	renderDownloadTrigger () {
		return <div className="download">{t('download')}</div>;
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
		const {store} = this.props;

		const aggregateItems = store.getAggregateValues();

		const containerStyle = {
			paddingBottom: (aggregateItems.length * 2) + 'rem'
		};

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
							<div className="download-option" onClick={this.downloadCSV}>{t('csv')}</div>
							<div className="download-option" onClick={this.downloadPDF}>{t('pdf')}</div>
						</div>
					</Flyout.Triggered>
				</div>
				<div className="table-container" style={containerStyle}>
					<Table {...this.props}/>
				</div>
			</div>
		);
	}
}
