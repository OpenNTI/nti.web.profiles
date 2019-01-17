import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import LabelValueList from './LabelValueList';

const t = scoped(LOCALE_PATHS.PERSONALITY, {
	title: 'Personality and Gifting',
	myersBriggs: 'Myers Briggs Results',
	giantVoices: 'Giant 5 Voices Results',
	fiveQuestions: '5Q Results'
});

const FIELDS = [
	(user) => {
		const result = user['myers_briggs_response'];

		if (!result || !user['myers_briggs']) { return null; }

		return {
			label: t('myersBriggs'),
			value: result
		};
	},
	(user) => {
		const result = user['five_q_response'];

		if (!result || !user['five_q']) { return null; }

		return {
			label: t('fiveQuestions'),
			value: result
		};
	},
	(user) => {
		const result = user['giant_5_voices_response'];

		if (!result || !user['giant_5_voices']) { return null; }

		return {
			label: t('giantVoices'),
			value: result
		};
	}
];

export default class ProfilePersonalityInfo extends React.Component {
	static shouldShow (user) {
		return (user['myers_briggs'] && user['myers_briggs_response']) ||
			(user['five_q'] && user['five_q_response']) ||
			(user['giant_5_voices'] && user['giant_5_voices_response']);
	}

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;
		const fields = FIELDS.map(field => field(user)).filter(field => !!field);

		return (
			<Card className="personality" title={t('title')}>
				<LabelValueList values={fields} />
			</Card>
		);
	}
}
