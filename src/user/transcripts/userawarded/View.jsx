import React from 'react';
import cx from 'classnames';

import { Input, DialogButtons, Panels } from '@nti/web-commons';
import { useAsyncValue, useReducerState } from '@nti/web-core';
import { getService } from '@nti/web-client';
import { useStoreValue } from '@nti/lib-store';

import t from './strings';
import { ErrorMessage } from './ErrorMessage';
import { AwardedDateInput } from './AwardedDateInput';
import { CreditTypeInput } from './CreditTypeInput';
import { MobileHeader } from './MobileHeader';

const FIELD_MAP = {
	title: 'Title',
	amount: 'Credit amount',
	credit_definition: 'Credit type',
};

const ERROR_MESSAGES = {
	RequiredMissing: e =>
		'Missing value: ' + (FIELD_MAP[e.message] || e.message),
	TooSmall: e => (FIELD_MAP[e.field] || e.field) + ' must be greater than 0.',
	InvalidFloatLiteral: e =>
		`${FIELD_MAP[e.field] || e.field} value is invalid.`,
};

//#region paint
const addCls = cls => p => ({
	...p,
	className: cx(cls, p.className),
});

const ValueContainer = styled('div').attrs(addCls('values-container'))`
	padding: 5px;
`;

const Label = styled('div').attrs(addCls('label'))`
	width: 10rem;
	font-size: 10px;
	padding-top: 0.3rem;
	text-transform: uppercase;
	font-weight: 600;
	color: var(--tertiary-grey);
	text-align: left;
	margin-bottom: 4px;
`;

const Text = styled(Input.Text)`
	width: 270px;
	height: 40px;
	background-color: white;
	font-weight: 300;
`;

const Description = styled(Input.TextArea)`
	&& {
		box-shadow: none;
		background-color: white;
		width: 100%;

		textarea {
			font-weight: 300 !important;
		}
	}
`;

const FieldGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 318px;
	padding: 20px 20px 60px;

	@media (min-width: 600px) {
		max-width: 600px;
	}
	@media (max-width: 600px) {
		margin: 0 auto;
	}
`;

//#endregion

export function UserAwardedCreditView({ credit, onDismiss }) {
	const init = useAsyncValue(
		`UserAwardedCreditView-${typeof credit}-${credit?.NTIID ?? credit}`,
		() => resolveInitialState(credit),
		credit
	);
	const [
		{ amount, date, description, error, item, issuer, selectedType, title },
		setState,
	] = useReducerState(init, [init]);
	const { addUserAwardedCredit, editUserAwardedCredit } = useStoreValue();

	const onSave = async () => {
		let payload = {
			description,
			title: title?.trim(),
			amount: amount ?? 1,
			credit_definition: selectedType?.NTIID,
			issuer,
			awarded_date: date?.getTime() / 1000,
		};

		try {
			if (item) {
				// saving an existing object
				await editUserAwardedCredit(item, payload, selectedType);
			} else {
				// adding a new object
				await addUserAwardedCredit(payload, selectedType);
			}

			onDismiss?.();
		} catch (e) {
			const error = (
				ERROR_MESSAGES[e.code] || (err => err.message || err)
			)(e);
			setState({ error });
		}
	};

	return (
		<div
			className="user-awarded-credits"
			css={css`
				background-color: white;
				@media (max-width: 600px) {
					height: 100%;
				}
			`}
		>
			<div className="content">
				<Panels.TitleBar
					title={t('awardCredit')}
					iconAction={onDismiss}
					css={css`
						background-color: var(--panel-background);
						box-shadow: 0 1px 0 0 #e2e2e2;
						padding-left: 25px;
						padding-right: 10px;

						i {
							font-size: 30px;
						}

						@media (max-width: 600px) {
							display: none;
						}
					`}
				/>
				<MobileHeader onSave={onSave} onCancel={onDismiss} />
				<ErrorMessage error={error} />

				<FieldGroup className="credit-fields">
					<ValueContainer className="title">
						<Label>{t('title')}</Label>
						<Text
							value={title}
							onChange={title => setState({ title })}
							placeholder={t('titlePlaceholder')}
						/>
					</ValueContainer>
					<ValueContainer className="issuer">
						<Label>{t('issuer')}</Label>
						<Text
							value={issuer}
							onChange={val => setState({ issuer: val })}
							placeholder="Name or organization"
						/>
					</ValueContainer>
					<ValueContainer
						className="description"
						css={css`
							width: 100%;
						`}
					>
						<Label>{t('description')}</Label>
						<Description
							value={description}
							onChange={description => setState({ description })}
							placeholder="Write Something..."
						/>
					</ValueContainer>
					<ValueContainer className="date">
						<Label>{t('awardedDate')}</Label>
						<AwardedDateInput
							value={date}
							onChange={date => setState({ date })}
						/>
					</ValueContainer>
					<ValueContainer className="awards">
						<Label>{t('amount')}</Label>
						<div
							className="inputs"
							css={css`
								display: flex;
							`}
						>
							<Text
								value={amount}
								maxLength="6"
								onChange={val => setState({ amount: val })}
								pattern="[0-9]*[.,]?[0-9]+"
								placeholder="1.00"
								css={css`
									width: 90px;

									&:invalid {
										background-color: rgba(
											var(--primary-red-rgb),
											0.1
										);
									}
								`}
							/>
							<CreditTypeInput
								value={selectedType}
								onChange={selectedType =>
									setState({ selectedType })
								}
							/>
						</div>
					</ValueContainer>
				</FieldGroup>
			</div>
			<DialogButtons
				buttons={[
					{
						label: t('cancel'),
						onClick: onDismiss,
					},
					{
						label: t('save'),
						onClick: onSave,
					},
				]}
				css={css`
					@media (max-width: 600px) {
						display: none;
					}
				`}
			/>
		</div>
	);
}

async function resolveInitialState(credit) {
	if (credit) {
		const def =
			typeof credit === 'string'
				? await (await getService()).getObject(credit)
				: credit;

		return {
			item: def,
			title: def.title,
			description: def.description,
			issuer: def.issuer,
			date: def.getAwardedDate(),
			amount: def.amount,
			selectedType: def.creditDefinition,
		};
	}

	return {
		date: new Date(),
		selectedType: null,
	};
}
