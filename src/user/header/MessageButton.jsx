import React from 'react';
import PropTypes from 'prop-types';
import {Flyout} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';

const t = scoped('nti-web-profiles.user.header.ManageControls', {
	message: 'Message',
	follow: 'Follow',
	unfollow: 'Unfollow',
	isOffline: '%(name)s is offline'
});

export default class ManageControls extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired,
		displayName: PropTypes.string.isRequired,
		presence: PropTypes.object
	}

	render () {
		const {entity, displayName, presence} = this.props;

		if(presence && presence.status !== null) {
			return (
				<LinkTo.Object context="open-chat" object={entity}>
					<div className="nti-button message available"><div className="icon"/><span className="text">{t('message')}</span></div>
				</LinkTo.Object>
			);
		}
		else {
			return (
				<Flyout.Triggered
					className="message-button-flyout"
					trigger={<div className="nti-button message"><span><div className="icon"/><span className="text">{t('message')}</span></span></div>}
					verticalAlign={Flyout.ALIGNMENTS.TOP}
					horizontalAlign={Flyout.ALIGNMENTS.CENTER}
					ref={this.attachFlyoutRef}
					hover
					arrow
				>
					<div className="tooltip-text">
						<span>{t('isOffline', {name: displayName})}</span>
					</div>
				</Flyout.Triggered>
			);
		}
	}
}
