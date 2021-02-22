import './NavLink.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';

const ACTIVE_CLASS = 'active';

export default class ProfileHeaderNavLink extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		onDismiss: PropTypes.func,
		addTriggerClass: PropTypes.func,
		removeTriggerClass: PropTypes.func,
	};

	componentWillUnmount() {
		const { removeTriggerClass } = this.props;

		if (removeTriggerClass && this.isActive) {
			removeTriggerClass(ACTIVE_CLASS);
		}
	}

	onClick = () => {
		const { onDismiss } = this.props;

		if (onDismiss) {
			onDismiss();
		}
	};

	onActivate = () => {
		const { addTriggerClass } = this.props;

		this.isActive = true;

		if (addTriggerClass) {
			addTriggerClass(ACTIVE_CLASS);
		}
	};

	onDeactivate = () => {
		const { removeTriggerClass } = this.props;

		if (removeTriggerClass && this.isActive) {
			removeTriggerClass(ACTIVE_CLASS);
		}

		this.isActive = false;
	};

	render() {
		const { title, ...otherProps } = this.props;

		delete otherProps.onDismiss;
		delete otherProps.addTriggerClass;
		delete otherProps.removeTriggerClass;

		return (
			<LinkTo.Object
				{...otherProps}
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
