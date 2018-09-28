import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';

import {Frame as AboutFrame} from '../about';

import Messages from './messages';
import {ERRORS} from './Store';

export default
@Connectors.Any.connect({
	[ERRORS]: 'errors'
})
class Frame extends React.Component {

	static propTypes = {
		children: PropTypes.any,
		errors: PropTypes.array
	}

	render () {
		const {children, errors, ...other} = this.props;
		return (
			<div className="nti-profile-edit-frame">
				<Messages errors={errors} />
				<AboutFrame {...other}>
					{children}
				</AboutFrame>
			</div>
		);
	}
}
