import React from 'react';
import PropTypes from 'prop-types';


CommunityIdentity.propTypes = {
	community: PropTypes.shape({
		displayName: PropTypes.string,
		about: PropTypes.string
	})
};
export default function CommunityIdentity ({community}) {
	return (
		<div>
			<div>{community.displayName}</div>
			<div>{community.about}</div>
		</div>
	);
}