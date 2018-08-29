import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Group from '../achievements/Group';

import BadgeList from './BadgeList';
import {
	default as Store,
	LOADING,
	EARNABLE,
	EARNED
} from './Store';

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges',
	earnable: 'Current Courses',
	earned: 'Completed',
	noneAvailable: 'No badges in progress',
	noneCompleted: 'You haven’t met course requirements to earn a badge.'
});


export default
@Store.connect({
	[LOADING]: 'loading',
	[EARNABLE]: 'earnable',
	[EARNED]: 'earned'
})
class View extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		entity: PropTypes.object,
		loading: PropTypes.bool,
		earnable: PropTypes.array,
		earned: PropTypes.array
	}

	componentDidMount () {
		const {store, entity} = this.props;
		store.load(entity);
	}

	render () {
		const {loading, earnable, earned} = this.props;

		return (
			<Group className="nti-profile-badges">
				<div className="header">
					{t('title')}
				</div>
				<div className="content">
					<BadgeList title={t('earnable')} items={earnable} loading={loading} empty={t('noneAvailable')} className="earnable" />
					<BadgeList title={t('earned')} items={earned} loading={loading} empty={t('noneCompleted')} className="completed" />
				</div>
			</Group>
		);
	}
}
