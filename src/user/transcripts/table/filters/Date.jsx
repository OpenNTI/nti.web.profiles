import React from 'react';
import PropTypes from 'prop-types';
import {Flyout, DateTime, Prompt} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import DateRange from './widgets/DateRange';
import FilterButton from './FilterButton';

const t = scoped('nti-web-profile.transcripts.table.filters.Date', {
	reset: 'Reset',
	filterByDate: 'Filter by date',
	yearToDate: 'Year-to-date',
	last30Days: 'Last 30 days',
	customRange: 'Custom range...',
	today: 'Today',
	from: 'From',
	to: 'To'
});


export default class DateFilter extends React.Component {
	static propTypes = {
		filterValue: PropTypes.object,
		onChange: PropTypes.func
	}

	attachFlyoutRef = x => this.flyout = x

	renderFilterTrigger () {
		return (
			<FilterButton
				className="transcript-date-filter-value"
				icon={this.renderIcon()}
				display={this.renderDateDisplay()}
			/>
		);
	}

	updateValue (newValue) {
		const {onChange} = this.props;

		if(onChange) {
			onChange(newValue);
		}

		this.flyout.dismiss();
	}

	reset = () => {
		this.updateValue(null);
	}

	filterYearToDate = () => {
		this.flyout.dismiss();

		const now = new Date();
		const startOfYear = new Date('1/1/' + now.getFullYear());

		this.updateValue({
			startDate: startOfYear
		});
	}

	filterLast30Days = () => {
		this.flyout.dismiss();

		const nowMS = Date.now();
		const nowMinus30Days = new Date(nowMS - (30 * 24 * 60 * 60 * 1000));

		this.updateValue({
			startDate: nowMinus30Days
		});
	}

	filterCustomRange = () => {
		this.flyout.dismiss();

		// open up date range dialog
		new Promise((fulfill, reject) => {
			Prompt.modal(
				<DateRange dateRange={this.props.filterValue} onSave={fulfill} onDismiss={reject}/>
			);
		}).then((value) => {
			this.updateValue({
				startDate: value.startDate,
				endDate: value.endDate
			});
		});
	}

	renderDateDisplay () {
		const { filterValue } = this.props;

		if(!filterValue) {
			return (<div className="date no-date">{t('filterByDate')}</div>);
		}

		return (
			<div className="date">
				<div className="date-value start-date"><span className="date-info">{t('from')}</span><span>{DateTime.format(filterValue.startDate, 'll')}</span></div>
				<div className="date-value end-date"><span className="date-info">{t('to')}</span><span>{filterValue.endDate ? DateTime.format(filterValue.endDate, 'll') : t('today')}</span></div>
			</div>
		);
	}

	renderIcon () {
		return (
			<div className="calendar-icon">
				<div className="calendar-hanger"/>
				<div className="calendar-top"/>
				<div className="calendar-bottom"/>
			</div>
		);
	}

	render () {
		return (
			<Flyout.Triggered
				className="transcript-date-filter"
				trigger={this.renderFilterTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachFlyoutRef}
			>
				<div>
					{this.props.filterValue && <div className="date-filter-option reset" onClick={this.reset}>{t('reset')}</div>}
					<div className="date-filter-option" onClick={this.filterYearToDate}>{t('yearToDate')}</div>
					<div className="date-filter-option" onClick={this.filterLast30Days}>{t('last30Days')}</div>
					<div className="date-filter-option" onClick={this.filterCustomRange}>{t('customRange')}</div>
				</div>
			</Flyout.Triggered>
		);
	}
}
