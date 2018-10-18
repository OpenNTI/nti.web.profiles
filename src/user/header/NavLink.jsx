import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';

export default class ProfileHeaderNavLink extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		onDismiss: PropTypes.func,
		addTriggerClass: PropTypes.func,
		removeTriggerClass: PropTypes.func
	}

	onClick = () => {
		const {onDismiss} = this.props;

		if (onDismiss) {
			onDismiss();
		}
	}

	onActivate = () => {
		const {addTriggerClass} = this.props;

		if (addTriggerClass) {
			addTriggerClass('active');
		}
	}

	onDeactivate = () => {
		const {removeTriggerClass} = this.props;

		if (removeTriggerClass) {
			removeTriggerClass('active');
		}
	}

	render () {
		const {title} = this.props;

		return (
			<LinkTo.Object
				{...this.props}
				className="profile-header-nav-link"
				onClick={this.onClick}
				data-title={title}
				activeClassName="active"
				onActivate={this.onActivate}
				onDeactivate={this.onDeactivate}
			>
				{title}
			</LinkTo.Object>
		);
	}
}
