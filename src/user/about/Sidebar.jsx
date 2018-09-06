import React from 'react';
import PropTypes from 'prop-types';

import SuggestedContacts from './suggestedcontacts';

export default class Sidebar extends React.Component {

	static propTypes = {
		user: PropTypes.object
	}

	render () {
		const {user} = this.props;

		return (
			<aside className="profile-about-sidebar">
				<SuggestedContacts user={user} />
			</aside>
		);
	}
}
