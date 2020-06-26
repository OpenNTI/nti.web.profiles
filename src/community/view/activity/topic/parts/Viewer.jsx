import React from 'react';
import PropTypes from 'prop-types';
import {decodeFromURI} from '@nti/lib-ntiids';
import {Viewer} from '@nti/web-discussions';
import {Router} from '@nti/web-routing';

function getLocationBreakdown (location) {
	const focusComment = location?.hash === '#comment';
	const editMode = location?.hash === '#edit';

	let selectedComment = null;

	if (location?.hash && !focusComment && !editMode) {
		selectedComment = decodeFromURI(location.hash.replace(/^#/, ''));
	}

	return {focusComment, editMode, selectedComment};
}

CommunityTopicViewer.propTypes = {
	topic: PropTypes.object,
	channel: PropTypes.object,
	community: PropTypes.object,

	location: PropTypes.shape({
		hash: PropTypes.string
	}),
	overrides: PropTypes.shape({
		getItemFor: PropTypes.func
	})
};
export default function CommunityTopicViewer ({topic, channel, community, location, overrides, ...otherProps}) {
	const router = Router.useRouter();

	const onClose = () => router.routeTo.object(channel);

	if (!topic.isBlogEntry) {
		return (
			<Viewer
				discussion={topic}
				container={[community, channel]}
				onClose={onClose}
				{...otherProps}
			/>
		);
	}

	const Cmp = overrides?.getItemFor(topic);
	const breakdown = getLocationBreakdown(location);

	if (!Cmp) { return null; }

	return (
		<Cmp
			topic={topic}
			channel={channel}
			community={community}

			{...breakdown}
			{...otherProps}
		/>
	);
}