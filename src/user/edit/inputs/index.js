import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';
import {TokenEditor} from '@nti/web-commons';

import {SET_FIELD_VALUE} from '../Store';

import Education from './Education';
import FieldContainer from './FieldContainer';
import List from './List';
import HTML from './HTML';
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
	positions: List.of(Position),
	interests: TokenEditor
};

const TYPES = {
	string: String,
	URI,
};

export default function getWidget (schema) {
	const {name, type, base_type: baseType, required} = schema;

	if (!name) {
		throw new Error('Must specify a name.');
	}

	const Component = NAMES[name] || TYPES[type] || (baseType && TYPES[baseType]);

	if (!Component) {
		logger.warn(`Unable to find a widget for '${name}' (name), '${type}' (type). Skipping it.`);
		return null;
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

	return Input;
}
