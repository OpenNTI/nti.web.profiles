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

const empty = x => !x || !x.length;

const t = scoped('nti-web-profile.badges.View', {
	title: 'Badges',
	earnable: 'Current Courses',
	earned: 'Completed',
	noneAvailable: {
		me: 'No badges in progress',
		them: 'This user doesn’t have any visible in-progress badges.'
	},
	noneCompleted: {
		me: 'You haven’t met course requirements to earn a badge.',
		them: ''
	},
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

	static deriveBindingFromProps = ({entity}) => entity

	render () {
		const {loading, earnable = [], earned = [], entity} = this.props;

		const userContext = (entity || {}).isAppUser ? 'me' : 'them';
		const isEmpty = !loading && userContext === 'them' && empty(earnable) && empty(earned);

		return isEmpty ? null : (
			<Group className="nti-profile-badges">
				<div className="header">
					{t('title')}
				</div>
				<div className="content">
					<BadgeList title={t('earnable')} items={earnable} loading={loading} empty={t(`noneAvailable.${userContext}`)} className="earnable" />
					<BadgeList title={t('earned')} items={earned} loading={loading} empty={t(`noneCompleted.${userContext}`)} className="completed" />
				</div>
			</Group>
		);
	}
}
