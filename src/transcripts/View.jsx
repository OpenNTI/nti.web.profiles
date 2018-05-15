import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Flyout, Button} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';
import {getService} from '@nti/web-client';

import Store from './Store';
import Table from './table/View';
import UserAwardedCredit from './userawarded/View';
import DateFilter from './table/filters/Date';
import TypeFilter from './table/filters/Type';

const t = scoped('nti-web-profile.transcripts.View', {
	aggregate: 'Summary',
	detailed: 'Detailed',
	csv: 'CSV',
	pdf: 'PDF',
	download: 'Download',
	addCredit: 'Add Credit'
});

export default
@Store.connect({
	loading: 'loading',
	dateFilter: 'dateFilter',
	typeFilter: 'typeFilter',
	items: 'items',
	aggregateItems: 'aggregateItems',
	availableTypes: 'availableTypes',
	csvLink: 'csvLink',
	pdfLink: 'pdfLink'
})
class TranscriptsView extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		items: PropTypes.arrayOf(PropTypes.object),
		dateFilter: PropTypes.object,
		typeFilter: PropTypes.string,
		availableTypes: PropTypes.arrayOf(PropTypes.string),
		csvLink: PropTypes.string,
		pdfLink: PropTypes.string
	}

	state = {}

	attachFlyoutRef = x => this.flyout = x

	componentDidMount () {
		const {entity, store} = this.props;

		store.loadTranscript(entity);

		getService().then(service => {
			if (entity.hasLink('add_credit')) {
				this.setState({canAddCredit: true});
			}
		});
	}

	renderDownloadTrigger () {
		return <div className="download"><i className="icon-download"/><span>{t('download')}</span></div>;
	}

	onDateFilterChange = (dateFilterValue) => {
		const {store} = this.props;

		store.setDateFilter(dateFilterValue);
	}

	onTypeFilterChange = (typeFilterValue) => {
		const {store} = this.props;

		store.setTypeFilter(typeFilterValue);
	}

	launchUserAwardedEditor = () => {
		UserAwardedCredit.show(this.state.entity);
	}

	renderContent () {
		const {items, dateFilter, typeFilter, store} = this.props;

		const aggregateItems = store.getAggregateValues();

		const containerStyle = {
			paddingBottom: (aggregateItems.length * 2) + 'rem'
		};

		if(items && items.length > 0) {
			return (
				<div className="table-container" style={containerStyle}>
					<Table {...this.props}/>
				</div>
			);
		}

		if(dateFilter || typeFilter) {
			return <div className="empty-message">No credits match your filter</div>;
		}

		return <div className="empty-message">No credits received yet</div>;
	}

	dismissDownloadFlyout = () => {
		this.flyout.dismiss();
	}

	renderDownloadButton () {
		const {csvLink, pdfLink} = this.props;

		return (
			<Flyout.Triggered
				className="transcript-download"
				trigger={this.renderDownloadTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachFlyoutRef}
			>
				<div>
					<div className={cx('download-option', {disabled: !csvLink})} onClick={this.dismissDownloadFlyout}><a href={csvLink}>{t('csv')}</a></div>
					<div className={cx('download-option', {disabled: !pdfLink})} onClick={this.dismissDownloadFlyout}><a href={pdfLink}>{t('pdf')}</a></div>
				</div>
			</Flyout.Triggered>
		);
	}

	render () {
		const {canAddCredit} = this.state;

		const {items, dateFilter, typeFilter} = this.props;

		const noData = (!items || items.length === 0) && !dateFilter && !typeFilter;

		return (
			<div className="nti-profile-transcripts">
				<div className={cx('top-controls', {'can-add-credit': canAddCredit})}>
					{!noData && (
						<div className="transcript-filters">
							<DateFilter onChange={this.onDateFilterChange} filterValue={this.props.dateFilter}/>
							<TypeFilter availableTypes={this.props.availableTypes || []} onChange={this.onTypeFilterChange} filterValue={this.props.typeFilter}/>
						</div>
					)}
					<div className="transcript-actions">
						{this.state.canAddCredit && <Button className="award-credit" onClick={this.launchUserAwardedEditor} rounded>{t('addCredit')}</Button>}
						{!noData && this.renderDownloadButton()}
					</div>
				</div>
				{this.renderContent()}
			</div>
		);
	}
}
