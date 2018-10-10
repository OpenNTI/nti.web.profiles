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
		launchEditor: PropTypes.func.isRequired
	}

	launchEditor = () => {
		this.props.launchEditor();
	}

	renderAvatar = ({match}) => {
		if(match) {
			return <div className="edit-avatar" onClick={this.launchEditor}><i className="icon-edit"/></div>;
		}
		else {
			return null;
		}
	}

	render () {
		const {entity} = this.props;

		return (
			<div className="user-info">
				<span className="avatar-container">
					<Avatar entity={entity} />
					<Matches.Object object={entity} context="edit" render={this.renderAvatar} />
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
