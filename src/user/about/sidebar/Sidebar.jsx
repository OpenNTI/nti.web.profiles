import './Sidebar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';

import Memberships from '../../memberships';

import SuggestedContacts from './suggestedcontacts';

export default
@Connectors.Any.connect({
	user: 'user'
})
class Sidebar extends React.Component {

	static propTypes = {
		user: PropTypes.object
	}

	render () {
		const {user} = this.props;

		return (
			<aside className="profile-about-sidebar">
				<SuggestedContacts user={user} />
				<Memberships user={user} />
			</aside>
		);
	}
}
