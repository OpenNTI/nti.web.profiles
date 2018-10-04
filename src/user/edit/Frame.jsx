import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';

import {ensureArray as a} from '../../util';
import {Frame as AboutFrame} from '../about';

import Messages from './messages';
import {ERROR, FIELD_ERRORS} from './Store';

export default
@Connectors.Any.connect({
	[ERROR]: 'error',
	[FIELD_ERRORS]: 'fieldErrors'
})
class Frame extends React.Component {

	static propTypes = {
		children: PropTypes.any,
		storeError: PropTypes.object,
		fieldErrors: PropTypes.array
	}

	render () {
		const {children, error, fieldErrors, ...other} = this.props;
		const errors = error ? [error, ...a(fieldErrors)] : fieldErrors;

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
