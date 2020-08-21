import './EntityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';
import {Avatar, DisplayName} from '@nti/web-commons';

export default class EntityCard extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	render () {
		const {entity} = this.props;

		return !entity ? null : (
			<LinkTo.Object object={entity} className="entity-card">
				<div className="avatar-container">
					<Avatar entity={entity} />
				</div>
				<DisplayName entity={entity} />
			</LinkTo.Object>
		);
	}
}
