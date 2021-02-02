import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';

import {SET_FIELD_VALUE} from '../Store';

import Bool from './Boolean';
import Choice from './Choice';
import DateTime from './DateTime';
import Education from './Education';
import FieldContainer from './FieldContainer';
import List from './List';
import MultipleSelect from './MultipleSelect';
import HTML from './HTML';
import Interests from './Interests';
import Position from './Position';
import Text from './Text';

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
	interests: Interests
};

const COMPONENTS = [
	Choice,
	DateTime,
	Text,
	Bool,
	MultipleSelect
];

const CACHE = {};

/**
 * Returns an input component for the given field schema
 * @param  {Object} schema The schema for the field
 * @returns {Component} A react component to handle editing of the field
 */
export default function getWidget (schema) {
	const {name, type, description} = schema;
	const key = `${name}-${type}-${description}`;

	if (!name) {
		throw new Error('Must specify a name.');
	}

	const Component = NAMES[name] || COMPONENTS.find(cmp => cmp.handles && cmp.handles(schema));

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
			input: PropTypes.object,
			setValue: PropTypes.func,
		}

		onChange = (value) => {
			const {setValue} = this.props;
			return setValue(name, value);
		}

		render () {
			const {input, ...otherProps} = this.props;
			const required = input.required;
			const props = {
				name,
				...otherProps,
				schema: input,
				required,
				onChange: this.onChange,
			};

			delete props.setValue;
			delete props.loaded;

			if (Component.shouldHide && Component.shouldHide(props)) {
				return null;
			}

			const label = k => Component.fieldLabel
				? Component.fieldLabel()
				: (schema || {}).description || t(k, {fallback: k});

			return (
				<FieldContainer required={required} label={label(name)}>
					<Component {...props} />
				</FieldContainer>
			);
		}
	}

	return CACHE[key] = Input;
}
