import React from 'react';

import String from './String';

export default class URIInput extends React.PureComponent {

	render () {
		return (
			<String className="nti-profile-uri-input" {...this.props} />
		);
	}
}
