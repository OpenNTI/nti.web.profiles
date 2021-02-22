import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo, Matches } from '@nti/web-routing';
import { Button } from '@nti/web-commons';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';

import { Store, Constants } from '../edit/';

import Editing from './Editing';

export const t = scoped('nti-web-profile.user-profile.edit.controls', {
	edit: 'Edit Profile',
	save: 'Save',
	cancel: 'Cancel',
});

class EditControls extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		loaded: PropTypes.bool,
		canEdit: PropTypes.bool,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.store.load(this.props.entity);
	}

	renderControls = ({ match }) => {
		const { loaded, canEdit } = this.props;
		return match ? (
			<Editing {...this.props} />
		) : !loaded || !canEdit ? null : (
			<LinkTo.Object
				className="edit-link"
				context="edit"
				object={this.props.entity}
			>
				<Button as="span">{t('edit')}</Button>
			</LinkTo.Object>
		);
	};

	render() {
		return (
			<div className="profile-edit-controls">
				<Matches.Object
					object={this.props.entity}
					context="edit"
					render={this.renderControls}
				/>
			</div>
		);
	}
}

export default decorate(EditControls, [
	Store.connect({
		[Constants.LOADED]: 'loaded',
		[Constants.CAN_EDIT]: 'canEdit',
	}),
]);
