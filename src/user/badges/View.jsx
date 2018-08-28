import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Loading} from '@nti/web-commons';

import {
	default as Store,
	LOADING,
	AVAILABLE,
	EARNED
} from './Store';

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges',
	available: 'Current Courses',
	completed: 'Completed',
	noneAvailable: 'No badges in progress',
	noneCompleted: 'You haven’t met course requirements to earn a badge.'
});


export default
@Store.connect({
	[LOADING]: 'loading',
	[AVAILABLE]: 'available',
	[EARNED]: 'earned'
})
class View extends React.Component {

	static propTypes = {
		loading: PropTypes.bool,
		available: PropTypes.array,
		earned: PropTypes.array
	}

	renderBadges (badges) {

	}

	render () {
		const {loading, available, earned} = this.props;

		return (
			<div className="nti-profile-badges">
				<div className="header">
					{t('title')}
				</div>
				<div className="content">
					<div className="badges-container available">
						<div className="subtitle">
							{t('available')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderBadges(available, t('noneAvailable'))}
					</div>
					<div className="badges-container completed">
						<div className="subtitle">
							{t('completed')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderBadges(earned, t('noneCompleted'))}
					</div>
				</div>
			</div>
		);
	}
}
