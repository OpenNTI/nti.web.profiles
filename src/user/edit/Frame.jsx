import React from 'react';

import {Frame as AboutFrame} from '../about';

import Messages from './messages';

export default class Frame extends React.PureComponent {
	render () {
		const {children, ...other} = this.props;

		return (
			<div className="nti-profile-edit-frame">
				<Messages />
				<AboutFrame {...other}>
					{children}
				</AboutFrame>
			</div>
		);
	}
}
