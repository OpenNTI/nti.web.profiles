import Logger from '@nti/util-logger';

import {ensureArray as arr} from '../../../util';

import {fieldGroups} from './field-config';

const logger = Logger.get('nti-profiles:edit:util:schema');

/**
 * Bin schema entries into groups.
 *
 * Input schema:
 * ```js
 * {
 *     alias: {base_type: 'string', name: 'alias', ...},
 *     email: {base_type: 'string', name: 'email', ...}
 *     ...
 * }
 * ```
 *
 * Input mapping of group name to schema field names (which fields are in a given group)
 * ```js
 * {
 *     role: 'role',
 *     about: ['realname', 'alias', 'email', ...],
 *     ...
 * }
 * ```
 *
 * Return mapping of group to schema fragment:
 * ```js
 * {
 *     role: {
 *         role: {base_type: 'string', required: false, ...}
 *     },
 *     about: {
 *         alias: {base_type: 'string', ...},
 *         email: {base_type: 'string', ...}
 *     }
 *     ...
 * }
 * ```

 * @param  {Object} schema - The input profile schema
 * @param  {Object} groups - A mapping of group name to member field names. Values may be a string (one field name)
 * or array (list of field names). A schema entry's existing 'group' property takes precedent when present.
 * @return {Object} A mapping of group name to schema fragment
 */
export default function groupFields (schema, groups = fieldGroups) {
	return Object.entries(groups).reduce((acc, [group, fields]) => {
		arr(fields).forEach(field => {
			const entry = schema[field];
			if (entry) {
				const g = entry.group || group;
				if (g !== group) {
					logger.info(`Profile schema entry ${field} specifies group ${g}, which doesn't match the provided mapping (${group}). Using the schema value.`);
				}
				acc[g] = acc[g] || {}; // ensure the group exists
				acc[g][field] = entry;
			}
			else {
				logger.info('No profile schema entry found for ${field}. Ignoring.');
			}
		});
		return acc;
	}, {});
}
