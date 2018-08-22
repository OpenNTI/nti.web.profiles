import React from 'react';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';


const t = scoped(LOCALE_PATHS.EDUCATION, {
	title: 'Education',
});

export default class About extends React.Component {

	render () {
		return (
			<Card className="education">
				<h2 className="title">{t('title')}</h2>
			</Card>
		);
	}
}
