import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import LabelValueList from './LabelValueList';

const t = scoped(LOCALE_PATHS.COMMUNITY, {
	title: 'Community',
	culture: 'Sectors Of Culture',
	cityInterest: 'Passionate About',
	initiatives: 'Organizations/Initiatives',
	churchCommunity: 'Church or Community'

});

const FIELDS = [
	(user) => {
		const {cultures} = user;

		if (!cultures) { return null; }

		return {
			label: t('culture'),
			value: cultures
		};
	},
	(user) => {
		const interest = user['city_interest'];

		if (!interest) { return null; }

		return {
			label: t('cityInterest'),
			value: interest
		};
	},
	(user) => {
		const {initiatives} = user;

		if (!initiatives) { return null; }

		return {
			label: t('initiatives'),
			value: initiatives
		};
	},
	(user) => {
		const community = user['church_community'];

		if (!community) { return null; }

		return {
			label: t('churchCommunity'),
			value: community
		};
	}
];


export default class ProfileCommunityInfo extends React.Component {
	static shouldShow (user) {
		return user['cultures'] || user['city_interest'] || user['initiatives'] || user['church_community'];
	}

	static propTypes = {
		user: PropTypes.object.isRequired
	}


	render () {
		const {user} = this.props;
		const fields = FIELDS.map(field => field(user)).filter(field => !!field);

		return (
			<Card className="user-profile-about-community" title={t('title')}>
				<LabelValueList values={fields} />
			</Card>
		);
	}
}
