import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {Connectors} from '@nti/lib-store';

import {
	SET_FIELD_VALUE,
	ERROR,
} from '../Store';

import Education from './Education';
import List from './List';
import HTML from './HTML';
import Interests from './Interests';
import Position from './Position';
import String from './String';
import URI from './URI';

const logger = Logger.get('nti-profiles:edit:inputs');

const NAMES = {
	about: HTML,
	education: List.of(Education),
	positions: List.of(Position),
	interests: Interests,
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
		[ERROR]: 'error'
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
				...this.props,
				schema,
				required,
				onChange: this.onChange
			};

			delete props.setValue;

			return <Component {...props} />;
		}
	}

	return Input;
}
