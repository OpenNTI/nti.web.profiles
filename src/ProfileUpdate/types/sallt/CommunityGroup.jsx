import React from 'react';
import { scoped } from '@nti/lib-locale';

import FieldGroup from '../../common/FieldGroup';

const t = scoped('nti-profiles.ProfileUpdate.types.sallt.community.View', {
	title: 'Community',
});

const ORDER = ['cultures', 'city_interest', 'initiatives', 'church_community'];

export default class SalltCommunity extends React.PureComponent {
	render() {
		return <FieldGroup order={ORDER} title={t('title')} {...this.props} />;
	}
}
