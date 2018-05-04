import React from 'react';
import PropTypes from 'prop-types';
import {Flyout} from '@nti/web-commons';

import TypeOption from './TypeOption';

export default class TypeFilter extends React.Component {
	static propTypes = {
		filterValue: PropTypes.object,
		store: PropTypes.object,
		onChange: PropTypes.func
	}

	attachFlyoutRef = x => this.flyout = x

	renderFilterTrigger () {
		return (
			<div className="transcript-type-filter-value">
				{this.renderIcon()}
				{this.renderTypeDisplay()}
				<div className="trigger"><i className="icon-chevron-down small"/></div>
			</div>
		);
	}

	updateValue = (newValue) => {
		const {onChange} = this.props;

		if(onChange) {
			onChange(newValue);
		}

		this.flyout.dismiss();
	}

	reset = () => {
		this.updateValue(null);
	}

	renderTypeDisplay () {
		const { filterValue } = this.props;

		if(!filterValue) {
			return (<div className="type-value no-type">{'Filter by type'}</div>);
		}

		return (
			<div className="type-value">
				<div className="value"><span className="type-info">By</span><span>{filterValue}</span></div>
			</div>
		);
	}

	renderIcon () {
		return (
			<div className="icon">
				<div className="type"/>
			</div>
		);
	}

	renderTypeOption = (option) => {
		return <TypeOption key={option} option={option} onClick={this.updateValue}/>;
	}

	render () {
		const {store} = this.props;

		return (
			<Flyout.Triggered
				className="transcript-type-filter"
				trigger={this.renderFilterTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachFlyoutRef}
			>
				<div>
					{this.props.filterValue && <div className="type-filter-option reset" onClick={this.reset}>Reset</div>}
					{store.getAvailableTypes().map(this.renderTypeOption)}
				</div>
			</Flyout.Triggered>
		);
	}
}
