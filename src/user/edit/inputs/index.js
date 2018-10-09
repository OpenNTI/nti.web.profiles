import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';

import {SET_FIELD_VALUE} from '../Store';

import Choice from './Choice';
import Education from './Education';
import Email from './Email';
import FieldContainer from './FieldContainer';
import List from './List';
import HTML from './HTML';
import Interests from './Interests';
import Position from './Position';
import String from './String';
import URI from './URI';

const logger = Logger.get('nti-profiles:edit:inputs');

const t = scoped('nti-profiles.user.edit.field-labels', {
	about: 'Write something about yourself.',
	realname: 'Name',
	alias: 'Display Name',
	'home_page': 'Home Page',
	facebook: 'Facebook Profile',
	linkedIn: 'LinkedIn Profile',
	twitter: 'Twitter Profile',
	googlePlus: 'Google+ Profile',
});

const NAMES = {
	about: HTML,
	education: List.of(Education),
	email: Email,
	positions: List.of(Position),
	interests: Interests
};

const TYPES = {
	Choice,
	string: String,
	email: Email,
	'nti.dataserver.users.interfaces.EmailAddress': Email,
	URI,
};

const CACHE = {};

export default function getWidget (schema) {
	const {name, type, base_type: baseType, required} = schema;
	const key = JSON.stringify(schema);

	if (!name) {
		throw new Error('Must specify a name.');
	}

	const Component = NAMES[name] || TYPES[type] || (baseType && TYPES[baseType]);

	if (!Component) {
		logger.warn(`Unable to find a widget for '${name}' (name), '${type}' (type). Skipping it.`);
		return null;
	}

	if (CACHE[key]) {
		return CACHE[key];
	}

	@Connectors.Any.connect({
		[SET_FIELD_VALUE]: 'setValue',
		[name]: 'value',
	})
	class Input extends React.Component {
		static propTypes = {
			setValue: PropTypes.func,
		}

		onChange = (value) => {
			const {setValue} = this.props;
			return setValue(name, value);
		}

		render () {
			const props = {
				name,
				...this.props,
				schema,
				required,
				onChange: this.onChange,
			};

			delete props.setValue;
			delete props.loaded;

			const label = k => Component.fieldLabel
				? Component.fieldLabel()
				: t(k, {fallback: k});

			return (
				<FieldContainer required={required} label={label(name)}>
					<Component {...props} />
				</FieldContainer>
			);
		}
	}

	return CACHE[key] = Input;
}
