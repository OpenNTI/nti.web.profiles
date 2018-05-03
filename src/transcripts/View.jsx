import React from 'react';
import PropTypes from 'prop-types';

import Table from './table/View';

export default class TranscriptsView extends React.Component {
	static propTypes = {
		entity: PropTypes.object
	}

	render () {
		return (
			<div className="nti-profile-transcripts">
				<Table/>
			</div>
		);
	}
}
