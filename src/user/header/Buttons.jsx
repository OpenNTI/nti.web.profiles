import './Buttons.scss';
import React from 'react';
import PropTypes from 'prop-types';

import EditControls from './EditControls';
import ManageControls from './ManageControls';

export default class Buttons extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	render () {
		const {entity} = this.props;

		return (entity || {}).isAppUser
			? <EditControls entity={entity} />
			: <ManageControls entity={entity} />;
	}
}
