import './DateRange.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@nti/web-core';
import { DayPickerRange } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

const t = scoped(
	'nti-web-profile.transcripts.table.filters.widgets.DateRange',
	{
		ok: 'OK',
		cancel: 'Cancel',
	}
);

export default class DateFilter extends React.Component {
	static propTypes = {
		dateRange: PropTypes.object,
		onSave: PropTypes.func,
		onDismiss: PropTypes.func,
	};

	state = {};

	componentDidMount() {
		const { dateRange } = this.props;

		this.setState({
			startDate: dateRange && dateRange.startDate,
			endDate: dateRange && dateRange.endDate,
		});
	}

	updateStartDate = startDate => {
		this.setState({ startDate });
	};

	updateEndDate = endDate => {
		this.setState({ endDate });
	};

	save = () => {
		const { onSave, onDismiss } = this.props;

		if (onSave) {
			onSave({
				startDate: this.state.startDate,
				endDate: this.state.endDate,
			});
		}

		if (onDismiss) {
			onDismiss();
		}
	};

	cancel = () => {
		const { onDismiss } = this.props;

		if (onDismiss) {
			onDismiss();
		}
	};

	render() {
		return (
			<div className="transcript-date-range">
				<DayPickerRange
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					updateStartDate={this.updateStartDate}
					updateEndDate={this.updateEndDate}
				/>
				<div className="controls">
					<div className="buttons">
						<Button className="cancel" onClick={this.cancel} plain>
							{t('cancel')}
						</Button>
						<Button className="save" onClick={this.save} plain>
							{t('ok')}
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
