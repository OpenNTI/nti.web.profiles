import React from 'react';
import PropTypes from 'prop-types';
import {RedirectTo} from '@nti/web-routing';

import {getFirstChannel} from '../utils';

//TODO: figure out if we need to do the redirect for mobile, of if we want to show a list of channels

CommunityChannels.propTypes = {
	channels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};
export default function CommunityChannels ({channels}) {
	const firstChannel = getFirstChannel(channels);

	if (!firstChannel) { return null; }
	
	return (
		<RedirectTo.Object object={firstChannel} />
	);
}