import React from 'react';
import PropTypes from 'prop-types';
import { Create } from '@nti/web-discussions';
import { Router } from '@nti/web-routing';

function getContainers(channels, community) {
	if (Array.isArray(channels)) {
		return channels.reduce((acc, channelList) => {
			return [
				...acc,
				channelList.channels.map(possible => {
					return {
						container: [community, possible],
						title: `${channelList.label} - ${possible.title}`,
					};
				}),
			];
		}, []);
	}

	return channels.channels.map(possible => {
		return {
			container: [community, possible],
			title: possible.title,
		};
	});
}

NewChannelTopic.propTypes = {
	dialog: PropTypes.bool,
	channel: PropTypes.object,

	channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	community: PropTypes.object,
};
export default function NewChannelTopic({
	dialog,
	channel,
	channels,
	community,
}) {
	const router = Router.useRouter();

	const afterSave = newTopic => router.routeTo.object(newTopic);
	const onClose = () => router.routeTo.object(channel);

	const containers = getContainers(channels, community);

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
