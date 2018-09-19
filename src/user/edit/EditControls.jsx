import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';
import {LinkTo, Matches} from '@nti/web-routing';
import {Parsers} from '@nti/web-editor';

import {LOCALE_PATHS} from '../constants';

import {SAVE_PROFILE} from './Store';

export default class EditControls extends React.Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	renderControls = ({match}) => {
		return match ? (
			<Editing {...this.props} />
		) : (
			<LinkTo.Name className="edit-link" name={LOCALE_PATHS.EDIT}>Edit - (TODO: Localize this)</LinkTo.Name>
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
		// const about = Parsers.HTML.fromDraftState(store.get('about'));
		// console.log(entity);
		// console.log(Parsers.HTML.fromDraftState(store.get('about')));
		// entity.save({
		// 	about
		// });
	}

	render () {
		return (
			<div className="editing">
				<LinkTo.Name name={`${LOCALE_PATHS.NAV}.about`}>Cancel - (TODO: Localize this)</LinkTo.Name>
				<button onClick={this.onSave}>Save - (TODO: Localize this)</button>
			</div>
		);
	}
}
