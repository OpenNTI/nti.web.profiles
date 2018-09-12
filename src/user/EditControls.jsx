import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo, Matches} from '@nti/web-routing';

import {LOCALE_PATHS} from './constants';

export default class EditControls extends React.Component {

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	renderControls (props) {
		return props.match ? (
			<Editing />
		) : (
			<LinkTo.Name className="edit-link" name={LOCALE_PATHS.EDIT}>Edit</LinkTo.Name>
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

function Editing (props) {
	return (
		<div className="editing">
			<LinkTo.Name name={`${LOCALE_PATHS.NAV}.about`}>Cancel</LinkTo.Name>
		</div>
	);
}
