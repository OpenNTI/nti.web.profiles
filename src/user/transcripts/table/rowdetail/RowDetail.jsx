import './RowDetail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Prompt, DateTime, DialogButtons, Panels} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

const t = scoped('nti-web-profile.transcripts.table.rowdetail.RowDetail', {
	earned: 'Earned',
	earnedOn: 'Earned On',
	issuedBy: 'Issued By'
});

/**
 * Class RowDetail
 * @prop {object} item Transcript credit
 * @prop {function} onDismiss Close the detail
 * @returns {RowDetail} Transcript credit detail
 */
export default class RowDetail extends React.Component {
	static show (item) {
		return new Promise((fulfill, reject) => {
			Prompt.modal(
				<RowDetail
					item={item}
					onSave={fulfill}
					onCancel={reject}
				/>,
				'row-detail-container'
			);
		});
	}

	static propTypes = {
		item: PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			amount: PropTypes.number.isRequired,
			creditDefinition: PropTypes.shape({
				type: PropTypes.string,
				unit: PropTypes.string
			}).isRequired,
			issuer: PropTypes.string.isRequired,
			getAwardedDate: PropTypes.func
		}).isRequired,
		onDismiss: PropTypes.func.isRequired
	}

	renderDetailInfo (label, value) {
		return (
			<div className="detail-info">
				<div className="label">{label}</div>
				<div className="value">{value}</div>
			</div>
		);
	}

	onConfirm = () => {
		const {onDismiss} = this.props;

		if(onDismiss) {
			onDismiss();
		}
	}

	render () {
		const {item} = this.props;
		const amount = (item.amount.toFixed && item.amount.toFixed(2)) || item.amount;

		return (
			<div className="transcript-row-detail">
				<Panels.TitleBar title={item.title} iconAction={this.onConfirm} />
				<div className="content">
					{item.description && (<div className="detail-description">{item.description}</div>)}
					<div className="details">
						{this.renderDetailInfo(t('earned'), amount + ' ' + item.creditDefinition.type + ' ' + item.creditDefinition.unit)}
						{this.renderDetailInfo(t('earnedOn'), DateTime.format(item.getAwardedDate()))}
						{this.renderDetailInfo(t('issuedBy'), item.issuer)}
					</div>
				</div>
				<DialogButtons
					buttons={[
						{
							label: 'OK',
							onClick: this.onConfirm,
						}
					]}
				/>
			</div>
		);
	}
}
