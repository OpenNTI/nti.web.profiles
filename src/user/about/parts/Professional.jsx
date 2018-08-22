import React from 'react';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';


const t = scoped(LOCALE_PATHS.PROFESSIONAL, {
	title: 'Professional',
});

export default class About extends React.Component {

	render () {
		return (
			<Card className="professional">
				<h2 className="title">{t('title')}</h2>
			</Card>
		);
	}
}
