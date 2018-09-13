import React from 'react';

import {Frame} from '../about';

import {About, Education, Professional, Interests} from './parts';

export default class Edit extends React.Component {
	render () {
		const {user} = this.props;

		return (
			<Frame {...this.props}>
				<div>
					<About user={user} />
					<Education user={user} />
					<Professional user={user} />
					<Interests user={user} />
				</div>
			</Frame>
		);
	}
}
