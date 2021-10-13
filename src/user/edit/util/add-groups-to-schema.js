import { ensureArray as arr } from '../../../util';

/**
 * Ensures each entry in the schema includes a group property according to the mapping defined above
 *
 * @param {Object} schema The schema to be modified
 * @param {Object} map A mapping of group name => fields
 * @returns {Object} A copy of the input schema with group fields added where necessary
 */
export default function addGroups(schema, map) {
	const result = { ...schema };
	Object.entries(map).forEach(([groupName, fields]) => {
		arr(fields).forEach(field => {
			const entry = result[field];
			if (entry && !entry.group) {
				entry.group = groupName;
			}
		});
	});
	return result;
}
