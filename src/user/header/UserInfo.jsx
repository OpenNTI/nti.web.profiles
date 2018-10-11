import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@nti/web-commons';
import {Matches} from '@nti/web-routing';

import Social from './Social';
import Summary from './Summary';
import Nav from './Nav';

export default class UserInfo extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		launchEditor: PropTypes.func
	}

	launchEditor = () => {
		this.props.launchEditor();
	}

	renderAvatarEdit = ({match}) => {
		if(match) {
			return <div className="edit-avatar" onClick={this.launchEditor}><i className="icon-edit"/></div>;
		}
		else {
			return null;
		}
	}

	render () {
		const {entity, launchEditor} = this.props;

		return (
			<div className="user-info">
				<span className="avatar-container">
					<Avatar entity={entity} />
					{launchEditor && <Matches.Object object={entity} context="edit" render={this.renderAvatarEdit} />}
				</span>

				<div className="user-info-col">
					<Summary entity={entity} />
					<Social entity={entity} />

					<Nav entity={entity} />
				</div>
			</div>
		);
	}
}
