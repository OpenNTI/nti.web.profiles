
import Logger from '@nti/util-logger';
import { scoped } from '@nti/lib-locale';

import { ensureArray as arr } from '../../../../../util';

import Message from './Message';

const logger = Logger.get('nti-profiles:edit:messages:field-validation');

const t = scoped('nti-profile-edit.validation-error-messages', {
	required: {
		one: 'Missing a required value in %(where)s',
		other: 'Missing required values in %(where)s',
	},
	invalid: {
		one: 'Invalid value in %(where)s',
		other: 'Invalid values in %(where)s',
	},
	both: 'Invalid and missing values in %(where)s',

	sections: {
		about: 'About',
		education: 'Education',
		positions: 'Professional',
	},
});

/**
 * Group errors according to their 'where' property,
 * allowing only one error per where/name combination
 * to prevent multiple messages for the same field.
 *
 * @param {Array} errors an array of error objects
 * @returns {Object} A mapping of wheres to errors
 */
function bucketByWhere(errors) {
	return arr(errors)
		.filter(Boolean)
		.reduce(
			(acc, e) => {
				const { error, error: { name } = {}, where } = e;
				if (!name) {
					logger.warn(
						'Expected an error property with a name. Ignoring. %o',
						e
					);
					return acc;
				}
				const key = `${name}:${where}`;
				if (!acc.seen.has(key)) {
					acc.seen.add(key);
					acc.buckets[where] = [...arr(acc.buckets[where]), error];
				}
				return acc;
			},
			{ seen: new Set(), buckets: {} }
		).buckets;
}

/**
 * For a given group of errors, count the number of required vs. invalid
 *
 * @param  {Array} errors An array of field validation error objects
 * @returns {Object} An object mapping 'types' (e.g. required or invalid) to number of occurrences
 */
const countTypes = errors =>
	arr(errors).reduce((acc, { validity: { valueMissing } = {} }) => {
		const type = valueMissing ? 'required' : 'invalid';
		acc[type] = (acc[type] || 0) + 1;
		return acc;
	}, {});

/**
 * Get the messages to display for the given bucketed errors.
 *
 * @param  {Object} buckets A mapping of wheres to errors, e.g. {education: [error, error], about: [error]}
 * @returns {Array} An array of messages for display
 */
function messages(buckets) {
	return Object.entries(buckets).map(([where, errors]) => {
		const { required = 0, invalid = 0 } = countTypes(errors);
		const type =
			required && invalid ? 'both' : required ? 'required' : 'invalid';

		const message = t(type, {
			count: required + invalid,
			where: t(['sections', where], { fallback: where }),
		});
		return <Message key={where} errors={errors} message={message} />;
	});
}

export default function getMessages(errors) {
	return messages(bucketByWhere(errors));
}
