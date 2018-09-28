import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {ensureArray as arr} from '../../../util';

const t = scoped('nti-profile-edit.validation-error-messages', {
	required: {
		one: 'Missing a required value in %(where)s',
		other: 'Missing %(count)s required values in %(where)s'
	},
	invalid: {
		one: 'Invalid value in %(where)s',
		other: '%(count)s invalid values in %(where)s'
	},
	both: 'Invalid and missing values in %(where)s',

	sections: {
		about: 'About',
		education: 'Education',
		positions: 'Professional'
	}
});

export default class Messages extends React.Component {

	static propTypes = {
		errors: PropTypes.array
	}
	/**
	 * Group errors according to their 'where' property,
	 * allowing only one error per where/name combination
	 * to prevent multiple messages for the same field.
	 * @return {Object} A mapping of wheres to errors
	 */
	buckets () {
		const {errors} = this.props;
		return arr(errors).reduce((acc, e) => {
			const {error, error: {name}, where} = e;
			const key = `${name}:${where}`;
			if (!acc.seen.has(key)) {
				acc.seen.add(key);
				acc.buckets[where] = [...arr(acc.buckets[where]), error];
			}
			return acc;
		}, {seen: new Set(), buckets: {}}).buckets;
	}

	/**
	 * For a given group of errors, count the number of required vs. invalid
	 * @param  {Array} errors An array of field validation error objects
	 * @return {Object} An object mapping 'types' (e.g. required or invalid) to number of occurrences
	 */
	countTypes = errors => arr(errors).reduce((acc, {validity: {valueMissing} = {}}) => {
		const type = valueMissing ? 'required' : 'invalid';
		acc[type] = (acc[type] || 0) + 1;
		return acc;
	}, {})

	/**
	 * Get the messages to display for the given bucketed errors.
	 * @param  {Object} buckets A mapping of wheres to errors, e.g. {education: [error, error], about: [error]}
	 * @return {Array} An array of messages for display
	 */
	messages (buckets) {
		return Object.entries(buckets).map(([where, errors]) => {
			const {required = 0, invalid = 0} = this.countTypes(errors);
			const type = required && invalid
				? 'both'
				: required
					? 'required'
					: 'invalid';

			return t(type, {
				count: required + invalid,
				where: t(['sections', where], {fallback: where})
			});
		});
	}

	render () {

		const messages = this.messages(this.buckets());

		return !messages || messages.length === 0
			? null
			: (
				<ul className="nti-profile-edit-messages">
					{messages.map((m, i) => <li key={i}>{m}</li>)}
				</ul>
			);
	}
}
