import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Input, Flyout, DateTime, DayPicker, Prompt, DialogButtons, Panels} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';
import {getService} from '@nti/web-client';

import TypeOption from './TypeOption';

const FIELD_MAP = {
	'title': 'Title',
	'amount': 'Credit amount',
	'credit_definition': 'Credit type'
};

const t = scoped('nti-web-profile.transcripts.userawarded.View', {
	awardCredit: 'Award Credit',
	issuer: 'Issuer',
	amount: 'Credit Amount',
	title: 'Title',
	titlePlaceholder: 'Course or event name',
	description: 'Description',
	awardedDate: 'Awarded Date',
	save: 'Add',
	cancel: 'Cancel'
});

const ERROR_MESSAGES = {
	RequiredMissing: e => 'Missing value: ' + (FIELD_MAP[e.message] || e.message),
	TooSmall: e => (FIELD_MAP[e.field] || e.field) + ' must be greater than 0.',
	InvalidFloatLiteral: e => `${FIELD_MAP[e.field] || e.field} value is invalid.`
};

export default class UserAwardedCreditView extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		credit: PropTypes.object,
		store: PropTypes.object.isRequired,
		onDismiss: PropTypes.func
	}

	static show (entity, credit, store) {
		return new Promise((fulfill, reject) => {
			Prompt.modal(
				<UserAwardedCreditView
					entity={entity}
					credit={credit}
					store={store}
					onSave={fulfill}
					onCancel={reject}
				/>,
				'user-awarded-view-container'
			);
		});
	}

	state = {
		types: []
	}

	attachInputRef = x => this.input = x;

	attachFlyoutRef = x => this.flyout = x

	attachDateFlyoutRef = x => this.dateFlyout = x

	componentDidMount () {
		this.init();
	}

	async init () {
		const {credit} = this.props;

		const service = await getService();

		let initState = {};

		const defsCollection = service.getCollection('CreditDefinitions', 'Global');
		const allDefs = await service.getBatch(defsCollection.href);

		if(credit) {
			const def = typeof credit === 'string' ? await service.getObject(credit) : credit;

			initState.item = def;
			initState.title = def.title;
			initState.description = def.description;
			initState.issuer = def.issuer;
			initState.date = def.getAwardedDate();
			initState.amount = def.amount;
			initState.selectedType = def.creditDefinition;
		}
		else {
			initState.date = new Date();
			initState.selectedType = allDefs.Items && allDefs.Items[0];
		}

		this.setState({...initState, types: allDefs.Items});
	}

	updateIssuer = (val) => {
		this.setState({issuer: val});
	}

	renderIssuerInput () {
		return <Input.Text value={this.state.issuer} onChange={this.updateIssuer} placeholder="Name or organization"/>;
	}

	updateAmount = (val) => {
		this.setState({amount: val});
	}

	renderAmountInput () {
		return <Input.Text value={this.state.amount} maxLength="6" onChange={this.updateAmount} pattern="[0-9]+([.,][0-9]+)?" ref={this.attachInputRef} placeholder="1.00"/>;
	}

	renderDateIcon () {
		return (
			<div className="calendar-icon">
				<div className="calendar-hanger"/>
				<div className="calendar-top"/>
				<div className="calendar-bottom"/>
			</div>
		);
	}

	renderDateTrigger () {
		const {date} = this.state;

		return (
			<div className="award-credit-date-value">
				{this.renderDateIcon()}
				<div className="date-value">{date && DateTime.format(date, 'LL')}</div>
				<i className="icon-chevron-down"/>
			</div>
		);
	}

	updateDate = (val) => {
		this.setState({date: val});

		this.dateFlyout.dismiss();
	}

	renderAwardedDateInput () {
		return (
			<Flyout.Triggered
				className="award-credit-date"
				trigger={this.renderDateTrigger()}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				sizing={Flyout.SIZES.MATCH_SIDE}
				ref={this.attachDateFlyoutRef}
			>
				<div>
					<DayPicker value={this.state.date} onChange={this.updateDate}/>
				</div>
			</Flyout.Triggered>
		);
	}

	onTypeSelected = (option) => {
		this.flyout.dismiss();

		this.setState({selectedType: option});
	}

	renderTrigger () {
		const {selectedType} = this.state;
		return <div className="selected-credit-type"><div className="type-value">{selectedType && (selectedType.type + ' ' + selectedType.unit)}</div><i className="icon-chevron-down"/></div>;
	}

	renderOption = (type) => {
		return <TypeOption key={type.type + ' ' + type.unit} option={type} onClick={this.onTypeSelected}/>;
	}

	renderCreditTypeInput () {
		return (
			<Flyout.Triggered
				className="award-credit-type"
				trigger={this.renderTrigger()}
				ref={this.attachFlyoutRef}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			>
				<div>
					{(this.state.types || []).map(this.renderOption)}
				</div>
			</Flyout.Triggered>
		);
	}

	updateTitle = (val) => {
		this.setState({title: val});
	}

	renderTitleInput () {
		return <Input.Text value={this.state.title} onChange={this.updateTitle} placeholder={t('titlePlaceholder')}/>;
	}

	updateDescription = (val) => {
		this.setState({description: val});
	}

	renderDescriptionInput () {
		return <Input.TextArea value={this.state.description} onChange={this.updateDescription} placeholder="Write Something..."/>;
	}

	onSave = async () => {
		const {onDismiss, store} = this.props;
		const {item} = this.state;

		let payload = {
			description: this.state.description,
			title: this.state.title && this.state.title.trim(),
			amount: this.state.amount || 1,
			'credit_definition': this.state.selectedType && this.state.selectedType.NTIID,
			issuer: this.state.issuer,
			'awarded_date': this.state.date && this.state.date.getTime() / 1000
		};

		try {
			if(item) {
				// saving an existing object
				await store.editUserAwardedCredit(item, payload, this.state.selectedType);
			}
			else {
			// adding a new object
				payload.MimeType = 'application/vnd.nextthought.credit.userawardedcredit';

				await store.addUserAwardedCredit(payload, this.state.selectedType);
			}

			if(onDismiss) {
				onDismiss();
			}
		}
		catch (e) {
			const error = (ERROR_MESSAGES[e.code] || (err => err.message || err))(e);
			this.setState({error});
		}
	}

	onCancel = () => {
		const {onDismiss} = this.props;

		if(onDismiss) {
			onDismiss();
		}
	}
	renderShortHeader () {
		return (
			<div className="short-header">
				<div className="controls">
					<div className="cancel" onClick={this.onCancel}>{t('cancel')}</div>
					<div className="header">{t('awardCredit')}</div>
					<div className="save" onClick={this.onSave}>{t('save')}</div>
				</div>
			</div>
		);
	}

	render () {
		const {error} = this.state;

		return (
			<div className="user-awarded-credits">
				<div className="content">
					<Panels.TitleBar title={(t('awardCredit'))} iconAction={this.onCancel} />
					{this.renderShortHeader()}
					<div className="error">{error}</div>
					<div className="credit-fields">
						<div className="values-container title">
							<div className="label">{t('title')}</div>
							{this.renderTitleInput()}
						</div>
						<div className="values-container issuer">
							<div className="label">{t('issuer')}</div>
							{this.renderIssuerInput()}
						</div>
						<div className="values-container description">
							<div className="label">{t('description')}</div>
							{this.renderDescriptionInput()}
						</div>
						<div className="values-container date">
							<div className="label">{t('awardedDate')}</div>
							{this.renderAwardedDateInput()}
						</div>
						<div className="values-container awards">
							<div className="label">{t('amount')}</div>
							<div className="inputs">
								{this.renderAmountInput()}
								{this.renderCreditTypeInput()}
							</div>
						</div>
					</div>
				</div>
				<DialogButtons
					buttons={[
						{
							label: t('cancel'),
							onClick: this.onCancel,
						},
						{
							label: t('save'),
							onClick: this.onSave
						}
					]}
				/>
			</div>
		);
	}
}
