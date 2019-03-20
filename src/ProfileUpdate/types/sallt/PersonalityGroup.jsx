import React from 'react';import {scoped} from '@nti/lib-locale';

import FieldGroup from '../../common/FieldGroup';

const t = scoped('nti-profiles.ProfileUpdate.types.sallt.personality.View', {
	title: 'Personality and Gifting'
});


const ORDER = [
	'myers_briggs',
	'myers_briggs_response',
	'giant_5_voices',
	'giant_5_voices_response',
	'five_q',
	'five_q_response'
];

export default class SalltCommunity extends React.PureComponent {
	render () {
		return (
			<FieldGroup order={ORDER} title={t('title')} {...this.props} />
		);
	}
}
