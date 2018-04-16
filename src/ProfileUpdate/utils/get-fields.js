function getField (schema, error) {
	return {
		schema,
		error
	};
}

export default function getFields (schema, validationErrors) {
	return validationErrors.map(x => getField(schema[x.field], x));
}
