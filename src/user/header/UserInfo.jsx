import './UserInfo.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@nti/web-commons';
import { Matches } from '@nti/web-routing';

import Social from './Social';
import Summary from './Summary';

export default class UserInfo extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		launchEditor: PropTypes.func,
	};

	launchEditor = () => {
		this.props.launchEditor();
	};

	renderAvatarEdit = ({ match }) => {
		if (match) {
			return (
				<div className="edit-avatar" onClick={this.launchEditor}>
					<i className="icon-edit" />
				</div>
			);
		} else {
			return null;
		}
	};

	render() {
		const { entity, launchEditor } = this.props;

		return (
			<React.Fragment>
				<span className="avatar-container">
					<Avatar entity={entity} />
					{launchEditor && (
						<Matches.Object
							object={entity}
							context="edit"
							render={this.renderAvatarEdit}
						/>
					)}
				</span>
				<Summary entity={entity} />
				<Social entity={entity} />
			</React.Fragment>
		);
	}
}
