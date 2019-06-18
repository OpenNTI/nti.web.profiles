export default function fixSchema (schema) {
	if (schema.type === 'string' && schema.choices) {
		return {...schema, type: 'Choice'};
	}

	return schema;
}