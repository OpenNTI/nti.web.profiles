import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo, Matches} from '@nti/web-routing';
// import {Parsers} from '@nti/web-editor';

import {LOCALE_PATHS} from '../../constants';

import Store from './Store';

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

@Store.connect({})
class Editing extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		entity: PropTypes.object.isRequired
	}

	onSave = (e) => {
		// const {store, entity} = this.props;
		// console.log(entity);
		// console.log(Parsers.HTML.fromDraftState(store.get('about')));
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
