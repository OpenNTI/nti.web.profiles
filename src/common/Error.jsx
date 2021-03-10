import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

const t = scoped('nti-profile.common.error', {
	unknown: 'An error occurred',
});

export default class Error extends React.PureComponent {
	static propTypes = {
		error: PropTypes.string,
	};

	render() {
		const { error } = this.props;

		return (
			<div className="nti-profile-error">
				{(error || {}).message || t('unknown')}
			</div>
		);
	}
}
