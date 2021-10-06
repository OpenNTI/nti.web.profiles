import './RowDetail.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { DateTime, DialogButtons, Panels } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

/** @typedef {import('@nti/lib-interfaces/src/models/credit/BaseCredit').default} BaseCredit */

const t = scoped('nti-web-profile.transcripts.table.rowdetail.RowDetail', {
	earned: 'Earned',
	earnedOn: 'Earned On',
	issuedBy: 'Issued By',
});

RowDetail.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		amount: PropTypes.number.isRequired,
		creditDefinition: PropTypes.shape({
			type: PropTypes.string,
			unit: PropTypes.string,
		}).isRequired,
		issuer: PropTypes.string.isRequired,
		getAwardedDate: PropTypes.func,
		getFormattedAmount: PropTypes.func,
	}).isRequired,
	onDismiss: PropTypes.func,
};

/**
 *
 * @param {Object} props
 * @param {BaseCredit} props.item Transcript credit
 * @param {() => void} props.onDismiss Close the detail
 * @returns {JSX.Element} Transcript credit detail
 */
export function RowDetail({ item, onDismiss }) {
	const amount =
		item.getFormattedAmount?.({ unit: true, type: true }) || item.amount;

	return (
		<div className="transcript-row-detail">
			<Panels.TitleBar title={item.title} iconAction={onDismiss} />
			<div className="content">
				{item.description && (
					<div className="detail-description">{item.description}</div>
				)}
				<div className="details">
					<DetailInfo label={t('earned')} value={amount} />
					<DetailInfo
						label={t('earnedOn')}
						value={<DateTime date={item.getAwardedDate()} />}
					/>

					<DetailInfo label={t('issuedBy')} value={item.issuer} />
				</div>
			</div>
			<DialogButtons
				buttons={[
					{
						label: 'OK',
						onClick: onDismiss,
					},
				]}
			/>
		</div>
	);
}

function DetailInfo({ label, value }) {
	return (
		<div className="detail-info">
			<div className="label">{label}</div>
			<div className="value">{value}</div>
		</div>
	);
}
