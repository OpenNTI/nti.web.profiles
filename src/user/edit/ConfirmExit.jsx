import React from 'react';
import PropTypes from 'prop-types';
import {Prompt} from '@nti/web-routing';

import {Store, HAS_UNSAVED_CHANGES} from './Store';

export default
@Store.connect({
	[HAS_UNSAVED_CHANGES]: 'hasUnsavedChanges',
})
class ConfirmExit extends React.PureComponent {

	static propTypes = {
		hasUnsavedChanges: PropTypes.bool
	}

	render () {
		const {hasUnsavedChanges = false} = this.props;

		return (
			<Prompt message="You have unsaved changes." when={hasUnsavedChanges} />
		);
	}
}
