import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import Experience from './ExperienceItem';

const t = scoped(LOCALE_PATHS.PROFESSIONAL, {
	title: 'Professional',
});

const fieldNames = ['companyName', 'title'];

export default class About extends React.Component {

	static propTypes = {
		user: PropTypes.object
	}

	render () {
		const {user: {positions = []}} = this.props;

		return (
			<Card className="positions">
				<h2 className="title">{t('title')}</h2>
				<div className="entries">
					{
						positions.map((item, i) => (
							<Experience key={i} item={item} fieldNames={fieldNames}/>
						))
					}
				</div>
			</Card>
		);
	}
}
