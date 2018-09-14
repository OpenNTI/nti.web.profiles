import React from 'react';

import {Frame} from '../about';

import About from './about';
import Education from './education';
import Professional from './professional';
import Interests from './interests';

export default class Edit extends React.Component {

	render () {
		const {user, ...props} = this.props;

		return (
			<Frame user={user} {...props}>
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
