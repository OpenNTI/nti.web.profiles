function getField (schema, error) {
	return {
		schema,
		error
	};
}

const DEFAULT = Symbol('Default');

const TYPE_HANDLERS = {
	[DEFAULT]: (schema, validationErrors) => {
		return [
			validationErrors.map(x => getField(schema[x.field], x))
		];
	},
	'ISALLTUserProfile': (schema, validationErrors) => {
		return [
			[
				...validationErrors.map(x => getField(schema[x.field], x)),
				getField(schema['myers_briggs_response'], null),
				getField(schema['giant_5_voices_response'], null),
				getField(schema['five_q_response'], null)
			]
		];
	}
};

export default function getFieldGroup (schema, validationErrors, type) {
	const handler = TYPE_HANDLERS[type] || TYPE_HANDLERS[DEFAULT];

	return handler(schema, validationErrors);
}
