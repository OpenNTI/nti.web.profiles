import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo, Matches} from '@nti/web-routing';
import {Button} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import {Store as EditStoreConstants} from '../edit/';
import {Store} from '../edit/Store';


const t = scoped('nti-web-profile.user-profile.edit.controls', {
	edit: 'Edit Profile',
	save: 'Save',
	cancel: 'Cancel'
});


export default class EditControls extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	renderControls = ({match}) => {
		return match ? (
			<Editing {...this.props} />
		) : (
			<LinkTo.Object className="nti-button primary edit-link" context="edit" object={this.props.entity}>{t('edit')}</LinkTo.Object>
		);
	}

	render () {
		return (
			<div className="profile-edit-controls">
				<Matches.Object object={this.props.entity} context="edit" render={this.renderControls} />
			</div>
		);
	}
}

@Store.connect({
	[EditStoreConstants.CLEAR_ERRORS]: 'clearErrors',
	[EditStoreConstants.FORM_ID]: 'formId',
	[EditStoreConstants.SAVE_PROFILE]: 'saveProfile'
})
class Editing extends React.Component {

	static propTypes = {
		clearErrors: PropTypes.func.isRequired,
		formId: PropTypes.string,
		saveProfile: PropTypes.func.isRequired,
		entity: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	}

	static contextTypes = {
		router: PropTypes.object
	}

	componentDidMount () {
		this.props.store.load(this.props.entity);
	}

	onSave = async (e) => {
		const {
			props: {
				clearErrors,
				saveProfile,
				entity
			},
			context: {
				router
			}
		} = this;
		const {target} = e;
		const formId = target.getAttribute('form');
		const form = document.querySelector(`form#${formId}`);

		clearErrors();

		if (!form || form.checkValidity()) {
			try {
				await saveProfile();
				router.routeTo.object(entity, 'about');
			}
			catch (err) {
				//
			}
		}
	}

	render () {
		const {formId, entity} = this.props;

		return (
			<div className="editing">
				<LinkTo.Object className="nti-button secondary cancel" object={entity} context="about">{t('cancel')}</LinkTo.Object>
				<Button form={formId} className="save" onClick={this.onSave}>{t('save')}</Button>
			</div>
		);
	}
}
