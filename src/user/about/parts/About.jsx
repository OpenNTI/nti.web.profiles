import React from 'react';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';


const t = scoped(LOCALE_PATHS.ABOUT, {
	title: 'About',
	editLabel: 'Tell us about yourself…',
	save: 'Save',
	saving: 'Saving',
	unknownError: 'Unable to update profile.'
});

export default class About extends React.Component {

	render () {
		return (
			<Card>
				<h2 className="title">{t('title')}</h2>
			</Card>
		);
	}
}
