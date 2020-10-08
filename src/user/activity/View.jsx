import React from 'react';
import PropTypes from 'prop-types';

import Stream from '../../stream';

export default class View extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;
		const context = !user ? null : {getStreamDataSource: () => user.activityStreamDataSource};
		return !context ? null : (
			<Stream context={context}/>
		);
	}
}
