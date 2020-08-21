import './FilterMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Prompt, Checkbox} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';
import cx from 'classnames';

import Store from '../../Store';

import DateRange from './widgets/DateRange';

const t = scoped('nti-web-profile.transcripts.table.filters.FilterMenu', {
	anytime: 'Anytime',
	pastMonth: 'Past Month',
	past6Months: 'Past 6 Months',
	customDate: 'Custom Date',
	creditTypes: 'Credit Types',
	dateRange: 'Date Range',
	reset: 'Reset'
});

const DATE_FILTERS = {
	PAST_MONTH: 'pastMonth',
	PAST_6_MONTHS: 'past6Months',
	CUSTOM_RANGE: 'customRange'
};

export default
@Store.connect({
	loading: 'loading',
	dateFilter: 'dateFilter',
	typeFilter: 'typeFilter',
	availableTypes: 'availableTypes'
}) class FilterMenu extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		dateFilter: PropTypes.object,
		typeFilter: PropTypes.arrayOf(PropTypes.string),
		availableTypes: PropTypes.arrayOf(PropTypes.string),
		fullScreenDatePicker: PropTypes.bool,
		canReset: PropTypes.bool,
		loading: PropTypes.bool
	}

	resetDateFilter = () => {
		this.props.store.setDateFilter(null);
	}

	filterPastMonth = () => {
		let d = new Date();
		d.setMonth(d.getMonth() - 1);

		this.props.store.setDateFilter({startDate: d, name: DATE_FILTERS.PAST_MONTH});
	}

	filterPast6Months = () => {
		let d = new Date();
		d.setMonth(d.getMonth() - 6);

		this.props.store.setDateFilter({startDate: d, name: DATE_FILTERS.PAST_6_MONTHS});
	}

	filterCustomDate = () => {
		const {dateFilter, fullScreenDatePicker, store} = this.props;

		// open up date range dialog
		new Promise((fulfill, reject) => {
			Prompt.modal(
				<DateRange dateRange={dateFilter} onSave={fulfill} onDismiss={reject}/>,
				{
					className: fullScreenDatePicker ? 'date-picker-full-screen' : ''
				}
			);
		}).then((value) => {
			store.setDateFilter({
				name: DATE_FILTERS.CUSTOM_RANGE,
				startDate: value.startDate,
				endDate: value.endDate
			});
		});
	}

	resetAll = () => {
		const {store} = this.props;

		store.resetAllFilters();
	}

	renderDateOption (clickHandler, label, selected) {
		const cls = cx('option', 'date-filter', { selected });

		return <div className={cls} onClick={clickHandler}>{label}</div>;
	}

	renderTypeOption = (option) => {
		const {store, typeFilter} = this.props;
		const selected = (typeFilter || []).includes(option);
		const cls = cx('option', 'type-filter', { selected });

		const clickHandler = () => {
			if(selected) {
				store.removeTypeFilter(option);
			}
			else {
				store.addTypeFilter(option);
			}
		};

		return (
			<div key={option} className={cls}>
				<Checkbox onChange={clickHandler} checked={selected}/>
				<span onClick={clickHandler}>{option}</span>
			</div>
		);
	}

	render () {
		const {dateFilter, availableTypes, fullScreenDatePicker, loading, canReset} = this.props;
		const cls = cx('transcript-filter-menu', {'full-screen': fullScreenDatePicker, 'disabled': loading});

		return (
			<div className={cls}>
				{canReset && <div className="reset" onClick={this.resetAll}>{t('reset')}</div>}
				<div className="option-title">{t('dateRange')}</div>
				{this.renderDateOption(this.resetDateFilter, t('anytime'), dateFilter === null)}
				{this.renderDateOption(this.filterPastMonth, t('pastMonth'), dateFilter && dateFilter.name === DATE_FILTERS.PAST_MONTH)}
				{this.renderDateOption(this.filterPast6Months, t('past6Months'), dateFilter && dateFilter.name === DATE_FILTERS.PAST_6_MONTHS)}
				{this.renderDateOption(this.filterCustomDate, t('customDate'), dateFilter && dateFilter.name === DATE_FILTERS.CUSTOM_RANGE)}
				<div className="option-title">{t('creditTypes')}</div>
				{availableTypes && availableTypes.map(this.renderTypeOption)}
			</div>
		);
	}
}
