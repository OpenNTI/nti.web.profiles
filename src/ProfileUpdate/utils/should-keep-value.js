const TYPE_CHECKS = {
	'Choice': (value, {schema}) => {
		const {choices} = schema;

		return choices && choices.indexOf(value) >= 0;
	}
};

export default function shouldKeepValue (value, field) {
	if (value == null) { return false; }

	const typeCheck = TYPE_CHECKS[field.schema.type];

	return !typeCheck || typeCheck(value, field);
}