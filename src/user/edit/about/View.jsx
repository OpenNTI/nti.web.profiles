import React from 'react';
import PropTypes from 'prop-types';

import About from './About';

export default class View extends React.Component {

	render () {
		return (
			<About {...this.props}/>
		);
	}
}
