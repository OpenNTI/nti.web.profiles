import React from 'react';
import PropTypes from 'prop-types';

import { Flyout } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import TypeOption from './TypeOption';
import FilterButton from './FilterButton';

const t = scoped('nti-web-profile.transcripts.table.filters.Type', {
	reset: 'Reset',
	filterByType: 'Filter by type',
	by: 'By',
});

export default class TypeFilter extends React.Component {
	static propTypes = {
		filterValue: PropTypes.string,
		availableTypes: PropTypes.arrayOf(PropTypes.string),
		onChange: PropTypes.func,
	};

	attachFlyoutRef = x => (this.flyout = x);

	renderFilterTrigger() {
		return (
			<FilterButton
				className="transcript-type-filter-value"
				icon={this.renderIcon()}
				display={this.renderTypeDisplay()}
			/>
		);
	}

	updateValue = newValue => {
		const { onChange } = this.props;

		if (onChange) {
			onChange(newValue);
		}

		this.flyout.dismiss();
	};

	reset = () => {
		this.updateValue(null);
	};

	renderTypeDisplay() {
		const { filterValue } = this.props;

		if (!filterValue) {
			return (
				<div className="type-value no-type">{t('filterByType')}</div>
			);
		}

		return (
			<div className="type-value">
				<div className="value">
					<span className="type-info">{t('by')}</span>
					<span>{filterValue}</span>
				</div>
			</div>
		);
	}

	renderIcon() {
		return <i className="icon-view" />;
	}

	renderTypeOption = option => {
		return (
			<TypeOption
				key={option}
				option={option}
				onClick={this.updateValue}
			/>
		);
	};

	render() {
		const { availableTypes } = this.props;

		return (
			<Flyout.Triggered
				className="transcript-type-filter"
				trigger={this.renderFilterTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachFlyoutRef}
			>
				<div>
					{this.props.filterValue && (
						<div
							className="type-filter-option reset"
							onClick={this.reset}
						>
							{t('reset')}
						</div>
					)}
					{availableTypes.map(this.renderTypeOption)}
				</div>
			</Flyout.Triggered>
		);
	}
}
