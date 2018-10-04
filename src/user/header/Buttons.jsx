import React from 'react';
import PropTypes from 'prop-types';
import {getAppUsername} from '@nti/web-client';

import EditControls from './EditControls';
import ManageControls from './ManageControls';

export default class Buttons extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	isMe = () => {
		const {entity} = this.props;

		return entity && getAppUsername() === entity.getID();
	}

	render () {
		const {entity} = this.props;

		return this.isMe() ? <EditControls entity={entity}/> : <ManageControls entity={entity}/>;
	}
}
