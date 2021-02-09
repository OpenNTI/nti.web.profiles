import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Flyout, Prompt} from '@nti/web-commons';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {getService} from '@nti/web-client';

import Store from './Store';
import Table from './table/View';
import UserAwardedCredit from './userawarded/View';
import FilterMenu from './table/filters/FilterMenu';
import AggreggateTable from './table/aggregate/View';

const t = scoped('nti-web-profile.transcripts.View', {
	aggregate: 'Summary',
	detailed: 'Detailed',
	csv: 'CSV',
	pdf: 'PDF',
	download: 'Download Transcript',
	addCredit: 'Add Credit',
	credits: 'Credits',
	confirm: 'Done',
	reset: 'Reset',
	filterHeader: 'Filters'
});

class TranscriptsContentsContainer extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		items: PropTypes.arrayOf(PropTypes.object),
		dateFilter: PropTypes.object,
		typeFilter: PropTypes.arrayOf(PropTypes.string),
		availableTypes: PropTypes.arrayOf(PropTypes.string),
		csvLink: PropTypes.string,
		pdfLink: PropTypes.string,
		showSidePanel: PropTypes.bool,
		showFiltersAsModal: PropTypes.bool
	}

	state = {}

	attachFlyoutRef = x => this.flyout = x

	attachFilterRef = x => this.filterFlyout = x

	componentDidMount () {
		const {entity, store} = this.props;

		store.loadTranscript(entity);

		getService().then(service => {
			if (entity.hasLink('add_credit')) {
				this.setState({canAddCredit: true});
			}
		});
	}

	componentDidUpdate (oldProps) {
		const {entity:oldEntity} = oldProps;
		const {entity:newEntity} = this.props;

		if(oldEntity === null || oldEntity.Username !== newEntity.Username) {
			this.props.store.loadTranscript(newEntity);
		}
	}

	renderDownloadTrigger () {
		let cls = 'download';
		const realData = this.getRealData();

		if(realData == null || realData.length === 0) {
			cls += ' disabled';
		}

		return <div className={cls}><i className="icon-download"/><span>{t('download')}</span></div>;
	}

	launchUserAwardedEditor = () => {
		UserAwardedCredit.show(this.state.entity, null, this.props.store);
	}

	renderEmptyMessage () {
		const {dateFilter, typeFilter} = this.props;

		if(dateFilter || typeFilter) {
			return <div className="empty-message">No credits match your filter</div>;
		}

		return <div className="empty-message">No credits received yet</div>;
	}

	renderContent () {
		const {items} = this.props;

		if(items && items.length > 0) {
			return (
				<div className="table-container">
					<Table {...this.props}/>
					{this.getRealData().length === 0 && this.renderEmptyMessage()}
				</div>
			);
		}

		return this.renderEmptyMessage();
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
					<div className={cx('download-option', {disabled: !csvLink})} onClick={this.dismissDownloadFlyout}><a target="_blank" rel="noopener noreferrer" download href={csvLink}>{t('csv')}</a></div>
					<div className={cx('download-option', {disabled: !pdfLink})} onClick={this.dismissDownloadFlyout}><a target="_blank" rel="noopener noreferrer" download href={pdfLink}>{t('pdf')}</a></div>
				</div>
			</Flyout.Triggered>
		);
	}

	renderFilterTrigger () {
		return <div className="filter-trigger">Filters</div>;
	}

	launchFilterMenu = () => {
		let dialog = null;

		return new Promise((fulfill, reject) => {
			const doReset = () => {
				this.props.store.setDateFilter(null);
				this.props.store.resetTypeFilters();
			};

			dialog = Prompt.modal(
				<div className="filter-menu-container">
					<div className="controls">
						<div className="reset" onClick={doReset}>{t('reset')}</div>
						<div className="header">{t('filterHeader')}</div>
						<div className="confirm" onClick={fulfill}>{t('confirm')}</div>
					</div>
					<FilterMenu fullScreenDatePicker/>
				</div>,
				{className: 'transcript-filter-modal'});
		}).then((savedEntry) => {
			dialog && dialog.dismiss();
		});
	}

	renderFilterDialog () {
		return <div className="filter-trigger" onClick={this.launchFilterMenu}>Filters</div>;
	}

	renderFilterFlyout () {
		return (
			<Flyout.Triggered
				className="transcript-filter"
				trigger={this.renderFilterTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
				verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachFilterRef}
			>
				<div>
					<FilterMenu canReset/>
				</div>
			</Flyout.Triggered>
		);
	}

	getRealData () {
		const {items} = this.props;

		return (items || []).filter(x => !x.isAddRow);
	}

	render () {
		const {canAddCredit} = this.state;
		const {dateFilter, typeFilter, showSidePanel, showFiltersAsModal} = this.props;
		const realData = this.getRealData();
		const noData = realData.length === 0 && !dateFilter && !typeFilter;
		const cls = cx('nti-profile-transcripts-container', {'has-side-panel': showSidePanel});

		return (
			<div className={cls}>
				<div className="nti-profile-transcripts">
					<AggreggateTable {...this.props}/>
					<div className="credit-details">
						<div className={cx('top-controls', {'can-add-credit': canAddCredit})}>
							<div className="transcript-actions">
								{/* {this.state.canAddCredit && <Button className="award-credit" onClick={this.launchUserAwardedEditor} rounded>{t('addCredit')}</Button>} */}
								<div className="section-title">{t('credits')}</div>
								<div className="controls">
									{!noData && !showSidePanel && showFiltersAsModal && this.renderFilterDialog()}
									{!noData && !showSidePanel && !showFiltersAsModal && this.renderFilterFlyout()}
									{this.renderDownloadButton()}
								</div>
							</div>
						</div>
						{this.renderContent()}
					</div>
				</div>
				{showSidePanel && <FilterMenu canReset/>}
			</div>
		);
	}
}


export default decorate(TranscriptsContentsContainer, [
	Store.connect({
		loading: 'loading',
		dateFilter: 'dateFilter',
		typeFilter: 'typeFilter',
		items: 'items',
		aggregateItems: 'aggregateItems',
		availableTypes: 'availableTypes',
		csvLink: 'csvLink',
		pdfLink: 'pdfLink'
	})
]);
