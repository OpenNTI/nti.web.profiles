function getField (schema, error) {
	return {
		schema,
		error
	};
}

export default function getFieldGroup (schema, validationErrors) {
	return [
		validationErrors.map(x => getField(schema[x.field], x))
	];
}
