import React from 'react';
import PropTypes from 'prop-types';

import getMessages from './factories';

export default class Messages extends React.Component {

	static propTypes = {
		errors: PropTypes.array
	}

	render () {
		const {errors} = this.props;
		const messages = getMessages(errors);

		return !messages || messages.length === 0
			? null
			: (
				<ul className="nti-profile-edit-messages">
					{messages.map((m, i) => <li key={i}>{m}</li>)}
				</ul>
			);
	}
}
