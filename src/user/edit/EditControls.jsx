import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo, Matches} from '@nti/web-routing';
import {Button} from '@nti/web-commons';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';

import {LOCALE_PATHS} from '../constants';

import Context from './Context';
import {SAVE_PROFILE} from './Store';

const t = scoped('nti-web-profile.user-profile.edit.controls', {
	edit: 'Edit Profile',
	save: 'Save',
	cancel: 'Cancel'
});


export default class EditControls extends React.Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	renderControls = ({match}) => {
		return match ? (
			<Editing {...this.props} />
		) : (
			<LinkTo.Name className="nti-button primary edit-link" name={LOCALE_PATHS.EDIT}>{t('edit')}</LinkTo.Name>
		);
	}

	render () {
		return (
			<div className="profile-edit-controls">
				<Matches.Name name={LOCALE_PATHS.EDIT} render={this.renderControls} />
			</div>
		);
	}
}

@Connectors.Any.connect({
	[SAVE_PROFILE]: 'saveProfile'
})
class Editing extends React.Component {

	static propTypes = {
		saveProfile: PropTypes.func.isRequired,
		entity: PropTypes.object.isRequired
	}

	onSave = (e) => {
		const {saveProfile} = this.props;
		return saveProfile();
	}

	render () {
		return (
			<div className="editing">
				<LinkTo.Name className="nti-button secondary cancel" name={`${LOCALE_PATHS.NAV}.about`}>{t('cancel')}</LinkTo.Name>
				{
					<Context.Consumer>
						{
							({formId}) => (<Button form={formId} className="save" onClick={this.onSave}>{t('save')}</Button>)
						}
					</Context.Consumer>
				}
			</div>
		);
	}
}
