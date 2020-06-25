import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Create} from '@nti/web-discussions';
import {Router} from '@nti/web-routing';

import Styles from './NewTopic.css';

NewChannelTopic.propTypes = {
	dialog: PropTypes.bool,
	channel: PropTypes.object,

	channels: PropTypes.array,
	community: PropTypes.object
};
export default function NewChannelTopic ({dialog, channel, channels, community}) {
	const router = Router.useRouter();

	const afterSave = (newTopic) => router.routeTo.object(newTopic);
	const onClose = () => router.routeTo.object(channel);

	const containers = channels.channels.map((possible) => {
		return {
			container: [community, possible],
			title: possible.title 
		};
	});

	return (
		<Create
			dialog={dialog}
			containers={containers}
			initialContainer={[community, channel]}

			onClose={onClose}
			afterSave={afterSave}
		/>
	);
}