import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';

TranscriptsView.propTypes = {
	entity: PropTypes.object
};

export default function TranscriptsView ({entity}) {
	if(!entity) {
		return <Loading.Ellipsis/>;
	}

	return (
		<div className="nti-profile-transcripts">
			Transcripts
		</div>
	);
}
