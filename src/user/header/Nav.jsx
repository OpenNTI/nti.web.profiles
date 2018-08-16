import React from 'react';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';

import {LOCALE_PATH} from '../constants';
import {ROUTES} from '../Router';

const t = scoped(LOCALE_PATH, {
	about: 'About',
	activity: 'Activity',
	achievements: 'Achievements',
	memberships: 'Memberships',
	transcripts: 'Transcripts',
});

const hasName = ({name}) => !!name;
const localeKey = name => name.split('.').slice(-1);

export default class Nav extends React.Component {
	render () {
		return (
			<nav className="profile-tabs">
				{
					ROUTES
						.filter(hasName)
						.map(({name, path}) => {
							const label = t(localeKey(name));
							return (
								<LinkTo.Name key={path} name={name} data-title={label} activeClassName="active">{label}</LinkTo.Name>
							);
						})
				}
			</nav>
		);
	}
}
