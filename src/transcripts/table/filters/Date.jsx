import React from 'react';
import PropTypes from 'prop-types';
import {Flyout, DateTime, Prompt} from '@nti/web-commons';

import DateRange from './widgets/DateRange';

export default class DateFilter extends React.Component {
	static propTypes = {
		filterValue: PropTypes.object,
		onChange: PropTypes.func
	}

	attachFlyoutRef = x => this.flyout = x

	renderFilterTrigger () {
		return (
			<div className="transcript-date-filter-value">
				{this.renderIcon()}
				{this.renderDateDisplay()}
				<div className="trigger"><i className="icon-chevron-down small"/></div>
			</div>
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
			return (<div className="date no-date">{'Filter by date'}</div>);
		}

		return (
			<div className="date">
				<div className="date-value start-date"><span className="date-info">From</span><span>{DateTime.format(filterValue.startDate, 'll')}</span></div>
				<div className="date-value end-date"><span className="date-info">To</span><span>{filterValue.endDate ? DateTime.format(filterValue.endDate, 'll') : 'Today'}</span></div>
			</div>
		);
	}

	renderIcon () {
		return (
			<div className="icon">
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
					{this.props.filterValue && <div className="date-filter-option reset" onClick={this.reset}>Reset</div>}
					<div className="date-filter-option" onClick={this.filterYearToDate}>Year-to-date</div>
					<div className="date-filter-option" onClick={this.filterLast30Days}>Last 30 Days</div>
					<div className="date-filter-option" onClick={this.filterCustomRange}>Custom range...</div>
				</div>
			</Flyout.Triggered>
		);
	}
}
