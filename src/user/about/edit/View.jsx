import React from 'react';

import Frame from '../Frame';

import {About, Education, Professional, Interests} from './parts';

export default class Edit extends React.Component {
	render () {
		return (
			<Frame {...this.props}>
				<div>
					<About />
					<Education />
					<Professional />
					<Interests />
				</div>
			</Frame>
		);
	}
}
