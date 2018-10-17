import React from 'react';
import PropTypes from 'prop-types';
import {Prompt as RoutePrompt} from '@nti/web-routing';
import {Prompt} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import {Store, HAS_UNSAVED_CHANGES} from './Store';

const t = scoped('nti-profiles.user.edit.confirm-exit', {
	unsavedChanges: 'You are currently editing your profile. Would you like to leave without saving?',
	leave: 'Leave',
	stay: 'Stay'
});

export default
@Store.connect({
	[HAS_UNSAVED_CHANGES]: 'hasUnsavedChanges',
})
class ConfirmExit extends React.PureComponent {

	static propTypes = {
		hasUnsavedChanges: PropTypes.bool
	}


	onRoute = async (cont, stop) => {
		try {
			await Prompt.areYouSure(t('unsavedChanges'), void 0, {
				confirmButtonLabel: t('leave'),
				cancelButtonLabel: t('stay')
			});

			cont();
		} catch (e) {
			stop();
		}
	}

	render () {
		const {hasUnsavedChanges = false} = this.props;

		return (
			<RoutePrompt onRoute={this.onRoute} when={hasUnsavedChanges} />
		);
	}
}
