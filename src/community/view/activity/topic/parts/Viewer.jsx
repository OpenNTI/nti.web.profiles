import React from 'react';
import PropTypes from 'prop-types';
import {decodeFromURI} from '@nti/lib-ntiids';

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
	location: PropTypes.shape({
		hash: PropTypes.string
	}),
	overrides: PropTypes.shape({
		getItemFor: PropTypes.func
	})
};
export default function CommunityTopicViewer ({topic, location, overrides, ...otherProps}) {
	const Cmp = overrides?.getItemFor(topic);
	const breakdown = getLocationBreakdown(location);

	if (!Cmp) { return null; }

	return (
		<Cmp
			topic={topic}
			{...breakdown}
			{...otherProps}
		/>
	);
}