import './Sidebar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { Connectors } from '@nti/lib-store';

import Memberships from '../../memberships';

import SuggestedContacts from './suggestedcontacts';

class Sidebar extends React.Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const { user } = this.props;

		return (
			<aside className="profile-about-sidebar">
				<SuggestedContacts user={user} />
				<Memberships user={user} />
			</aside>
		);
	}
}

export default decorate(Sidebar, [
	Connectors.Any.connect({
		user: 'user',
	}),
]);
