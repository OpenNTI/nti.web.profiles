import React from 'react';

import About from './About';

export default class View extends React.Component {

	render () {
		return (
			<About {...this.props} />
		);
	}
}
