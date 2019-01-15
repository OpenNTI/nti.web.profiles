import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo, Matches} from '@nti/web-routing';
import {Button} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import {Store, Constants, confirmSchemaChanges} from '../edit/';


const t = scoped('nti-web-profile.user-profile.edit.controls', {
	edit: 'Edit Profile',
	save: 'Save',
	cancel: 'Cancel'
});


export default
@Store.connect({
	[Constants.LOADED]: 'loaded',
	[Constants.CAN_EDIT]: 'canEdit'
})
class EditControls extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		loaded: PropTypes.bool,
		canEdit: PropTypes.bool
	}

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	componentDidMount () {
		this.props.store.load(this.props.entity);
	}

	renderControls = ({match}) => {
		const {loaded, canEdit} = this.props;
		return match ? (
			<Editing {...this.props} />
		) : !loaded || !canEdit ? null : (
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
	[Constants.CLEAR_ERRORS]: 'clearErrors',
	[Constants.FORM_ID]: 'formId',
	[Constants.HAS_UNSAVED_CHANGES]: 'unsaved',
	[Constants.SAVE_PROFILE]: 'saveProfile'
})
class Editing extends React.Component {

	static propTypes = {
		clearErrors: PropTypes.func.isRequired,
		formId: PropTypes.string,
		saveProfile: PropTypes.func.isRequired,
		unsaved: PropTypes.bool,
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
				store,
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
				await confirmSchemaChanges(store);
				await saveProfile();
				router.routeTo.object(entity, 'about');
			}
			catch (err) {
				//
			}
		}
	}

	render () {
		const {formId, entity, unsaved} = this.props;

		return (
			<div className="editing">
				<LinkTo.Object className="nti-button secondary cancel" object={entity} context="about">{t('cancel')}</LinkTo.Object>
				<Button form={formId} className="save" disabled={!unsaved} onClick={this.onSave}>{t('save')}</Button>
			</div>
		);
	}
}
