import React from 'react';
import PropTypes from 'prop-types';

import { Flyout } from '@nti/web-commons';
import { Button } from '@nti/web-core';
import { scoped } from '@nti/lib-locale';
import { LinkTo } from '@nti/web-routing';

const t = scoped('nti-web-profiles.user.header.ManageControls', {
	message: 'Message',
	follow: 'Follow',
	unfollow: 'Unfollow',
	isOffline: '%(name)s is offline',
});

const Icon = styled.span`
	background-image: url(./assets/message.svg);
	width: 30px;
	height: 30px;
	margin: -7px 0.5em -7px 0;
`;

const Message = styled(Button).attrs({})`
	background: #ddd;
	color: var(--tertiary-grey);

	&.available {
		background-color: var(--primary-blue);
		color: white;

		${Icon} {
			background-image: url(./assets/message-w.svg);
		}
	}
`;

export default class ManageControls extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		displayName: PropTypes.string.isRequired,
		presence: PropTypes.object,
	};

	render() {
		const { entity, displayName, presence } = this.props;

		if (presence?.isOnline()) {
			return (
				<LinkTo.Object context="open-chat" object={entity}>
					<Message available>
						<Icon />
						<span>{t('message')}</span>
					</Message>
				</LinkTo.Object>
			);
		} else {
			return (
				<Flyout.Triggered
					className="message-button-flyout"
					trigger={
						<Message>
							<Icon />
							<span>{t('message')}</span>
						</Message>
					}
					verticalAlign={Flyout.ALIGNMENTS.TOP}
					horizontalAlign={Flyout.ALIGNMENTS.CENTER}
					ref={this.attachFlyoutRef}
					hover
					arrow
				>
					<div className="tooltip-text">
						<span>{t('isOffline', { name: displayName })}</span>
					</div>
				</Flyout.Triggered>
			);
		}
	}
}
