import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';

import {ensureArray as a} from '../../../util';
import {ERROR, FIELD_ERRORS} from '../Store';

import getMessages from './factories';

export default
@Connectors.Any.connect({
	[ERROR]: 'error',
	[FIELD_ERRORS]: 'fieldErrors'
})
class Messages extends React.Component {

	static propTypes = {
		error: PropTypes.object,
		fieldErrors: PropTypes.array
	}

	render () {
		const {error, fieldErrors} = this.props;
		const errors = error ? [error, ...a(fieldErrors)] : fieldErrors;

		const messages = getMessages(errors);

		return !messages || messages.length === 0
			? null
			: (
				<ul className="nti-profile-edit-messages">
					{messages.map((m, i) => <li key={i}>{m}</li>)}
				</ul>
			);
	}
}
