import fixSchema from './fix-schema';
import shouldHideField from './should-hide-field';

function updateSchema(schema, field) {
	const fieldSchema = fixSchema(schema[field.schema.name]);

	return {
		...field,
		schema: fieldSchema,
		hidden: shouldHideField(fieldSchema),
	};
}

function updateFields(schema, fields) {
	return fields
		.filter(field => Boolean(schema[field.schema.name]))
		.map(field => updateSchema(schema, field));
}

export default function updateFieldGroups(schema, groups, type, oldType) {
	if (oldType !== type) {
		return [];
	}

	return groups.map(fields => updateFields(schema, fields));
}
