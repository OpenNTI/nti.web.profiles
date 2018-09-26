import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';

import {slugify} from '../../util';
import {Card} from '../../common';
import {Frame} from '../about';

import FieldContainer from './FieldContainer';
import {LOADED, GET_SCHEMA_ENTRY} from './Store';
import getWidget from './inputs';

const t = scoped('nti-profiles.user.edit', {
	titles: {
		about: 'About',
		education: 'Education',
		positions: 'Professional',
	},
	labels: {
		about: 'Write something about yourself.',
		realname: 'Name',
		alias: 'Display Name',
		'home_page': 'Home Page',
		facebook: 'Facebook Profile',
		linkedIn: 'LinkedIn Profile',
		twitter: 'Twitter Profile',
		googlePlus: 'Google+ Profile',
	}
});

const SECTIONS = [
	{
		key: 'about',
		fields: [
			'about',
			'realname',
			'alias',
			'email',
			'location',
			'home_page',
			'facebook',
			'linkedIn',
			'twitter',
			'googlePlus'
		]
	},
	{
		key: 'education',
	},
	{
		key: 'positions',
	},
	{
		key: 'interests',
	},
];

export default
@Connectors.Any.connect({
	[LOADED]: 'loaded',
	[GET_SCHEMA_ENTRY]: 'getSchemaEntry'
})
class View extends React.Component {

	static propTypes = {
		loaded: PropTypes.bool,
		getSchemaEntry: PropTypes.func,
		className: PropTypes.string,
		user: PropTypes.object
	}

	getSection = ({key, fields}) => {
		const {getSchemaEntry} = this.props;

		const inputs = (fields || [key]).map(fieldName => ({
			fieldName,
			Widget: getWidget(getSchemaEntry(fieldName))
		})).filter(({Widget}) => Widget);

		const title = t(['titles', key], {fallback: key});
		// const label = k => t.isMissing(`labels.${k}`) ? undefined : t(['labels', k]);
		const label = k => t(['labels', k], {fallback: k});

		return (
			<Card key={key} className={slugify(key)} title={title}>
				{inputs.map(({fieldName, Widget}) => (
					<FieldContainer key={fieldName} className={slugify(fieldName)} label={label(fieldName)}>
						<Widget />
					</FieldContainer>
				))}
			</Card>
		);
	}

	render () {
		const {loaded, className, user} = this.props;

		if (!loaded) {
			return null;
		}

		const widgets = SECTIONS.map(this.getSection);

		return (
			<Frame className={className} user={user}>
				<div>
					{widgets}
				</div>
			</Frame>
		);
	}
}
