import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';

export default class ProfileHeaderNavLink extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		onDismiss: PropTypes.func
	}

	onClick = () => {
		const {onDismiss} = this.props;

		if (onDismiss) {
			onDismiss();
		}
	}

	render () {
		const {title} = this.props;

		return (
			<LinkTo.Object {...this.props} className="profile-header-nav-link" onClick={this.onClick} data-title={title} activeClassName="active">
				{title}
			</LinkTo.Object>
		);
	}
}
