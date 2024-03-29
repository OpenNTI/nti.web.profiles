import Logger from '@nti/util-logger';

import { ensureArray as arr } from '../../../util';

import fixSchemaEntry from './fix-schema-entry';

const logger = Logger.get('nti-profiles:edit:util:get-grouped-schema-fields');
const OTHER = 'other';

/**
 * Buckets schema fields according to their group property
 *
 * @param  {Object} schema - The profile schema
 * @param  {string|Array} fields - The fields of interest.
 * @returns {Object} a mapping of group name => schema fragments
 */
export default function getGroupedSchemaFields(schema, fields) {
	if (!schema || arr(fields).length === 0) {
		return {};
	}

	return arr(fields).reduce((acc, field) => {
		const entry = schema[field];
		if (entry) {
			const group = entry.group || OTHER;
			if (group === OTHER) {
				logger.warn(
					`Schema entry ${field} doesn't specify a group. Using '${OTHER}'.`
				);
			}
			acc[group] = acc[group] || {};
			acc[group][field] = fixSchemaEntry(entry);
		}
		return acc;
	}, {});
}
