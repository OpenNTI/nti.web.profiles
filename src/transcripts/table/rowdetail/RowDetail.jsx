import React from 'react';
import PropTypes from 'prop-types';
import {Prompt, DateTime, DialogButtons} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

const t = scoped('nti-web-profile.transcripts.table.rowdetail.RowDetail', {
	earned: 'Earned',
	earnedOn: 'Earned On',
	issuedBy: 'Issued By'
});

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

	propTypes = {
		item: PropTypes.object.isRequired,
		onDismiss: PropTypes.func
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

		return (
			<div className="transcript-row-detail">
				<div className="content">
					<div className="detail-title">{item.title}</div>
					{item.description && (<div className="detail-description">{item.description}</div>)}
					<div className="details">
						{this.renderDetailInfo(t('earned'), item.amount + ' ' + item.creditDefinition.type + ' ' + item.creditDefinition.unit)}
						{this.renderDetailInfo(t('earnedOn'), DateTime.format(item.getAwardedDate(), 'LL'))}
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
			</div>);
	}
}
