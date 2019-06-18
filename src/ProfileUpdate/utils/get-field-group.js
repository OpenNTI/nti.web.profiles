import fixSchema from './fix-schema';
import shouldHideField from './should-hide-field';

function getField (schema, error) {
	schema = fixSchema(schema);

	return {
		schema,
		error,
		hidden: shouldHideField(schema)
	};
}

function hasError (name, errors) {
	return errors.some(error => error.field === name);
}

const DEFAULT = Symbol('Default');

const TYPE_HANDLERS = {
	[DEFAULT]: (schema, validationErrors) => {
		return [
			validationErrors.map(x => getField(schema[x.field], x))
		];
	},
	'ISALLTUserProfile': (schema, validationErrors) => {
		const fields = [
			...validationErrors.map(x => getField(schema[x.field], x))
		];

		if (hasError('myers_briggs', validationErrors)) {
			fields.push(getField(schema['myers_briggs_response'], null));
		}

		if (hasError('giant_5_voices', validationErrors)) {
			fields.push(getField(schema['giant_5_voices_response'], null));
		}

		if (hasError('five_q', validationErrors)) {
			fields.push(getField(schema['five_q_response'], null));
		}

		return [fields];
	},
	'IOPSRCUserProfile': (schema, validationErrors) => {
		const fields = [
			...validationErrors.map(x => getField(schema[x.field], x))
		];

		if (hasError('is_district_admin', validationErrors)) {
			fields.push(getField(schema['admin_district_names'], null));
		}

		if (hasError('teacher_certification', validationErrors)) {
			fields.push(getField(schema['teacher_certification_number'], null));
		}

		return [fields];
	}
};

export default function getFieldGroup (schema, validationErrors, type, baseType) {
	const handler = TYPE_HANDLERS[type] || TYPE_HANDLERS[baseType] || TYPE_HANDLERS[DEFAULT];

	return handler(schema, validationErrors);
}
