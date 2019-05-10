import {scoped} from '@nti/lib-locale';
import Logger from '@nti/util-logger';

import {ensureArray as arr} from '../../../../../util';

const noop = () => void 0;

const logger = Logger.get('nti-profiles:edit:messages:server');

const CODE_REQUIRED = 'RequiredMissing';
const CODE_INVALID = 'ConstraintNotSatisfied';
const BOTH = 'RequiredAndInvalid';
const UNSPECIFIED_VALIDATION_ERROR = 'UnspecifiedValidationError';
const VALIDATION_ERROR = 'ValidationError';
const UNKNOWN_ERROR = 'UnknownError';
const LIST_DELIMITER = 'ListDelimiter';

const t = scoped('nti-profile-edit.server-error-messages', {
	EmailAddressInvalid: 'The email address you have entered is not valid.',
	unknown: 'An error occurred processing your request.',
	[CODE_REQUIRED]: {
		one: 'The %(fields)s field is required.',
		other: 'These fields are required: %(fields)s'
	},
	[CODE_INVALID]: {
		one: 'The %(fields)s field is invalid.',
		other: 'These fields are invalid: %(fields)s'
	},
	[BOTH]: 'These fields are required or invalid: %(fields)s',
	[UNSPECIFIED_VALIDATION_ERROR]: {
		one: 'Unable to save. Your submission included an invalid value.',
		other: 'Unable to save. Your submission included invalid values.'
	},
	[UNKNOWN_ERROR]: 'Unable to save. An unknown error occurred.',
	[LIST_DELIMITER]: ', '
});

const localizeFieldName = name => !name ? null : t(['fieldNames', name], {fallback: name});

const extractValidationErrors = x => {
	// has ValidationErrors or is a validation error or bail
	return arr(x.ValidationErrors || ((x.statusCode === 422 && x.field) ? x : null)).filter(Boolean);
};

const categorize = errors => arr(errors).reduce((acc, error) => {
	const validation = extractValidationErrors(error);
	if (validation.length > 0) {
		acc[VALIDATION_ERROR] = [...(acc[VALIDATION_ERROR] || []), ...validation];
	}
	else {
		acc[UNKNOWN_ERROR] = [...(acc[UNKNOWN_ERROR] || []), error];
	}
	return acc;
}, {});

const handlers = {
	[VALIDATION_ERROR]: errors => {
		// extract an array of field names (localized)
		const fields = errors.map(({field}) => localizeFieldName(field)).filter(Boolean);

		// bail with a generic error message if we can't get the field names.
		if (fields.length === 0) { // validation errors with unidentifiable fields?
			logger.warn('Unable to identify fields in ValidationErrors. Using generic validation message.');
			return t(UNSPECIFIED_VALIDATION_ERROR, {count: errors.length});
		}

		const types = errors.reduce((result, {code} = {}) => {
			result.add(code === CODE_REQUIRED ? CODE_REQUIRED : CODE_INVALID);
			return result;
		}, new Set());

		const key = types.size > 1
			? BOTH
			: types.has(CODE_REQUIRED)
				? CODE_REQUIRED
				: CODE_INVALID;

		return t(key, {
			count: fields.length,
			fields: fields.join(t(LIST_DELIMITER, {fallback: ', '}))
		});
	},

	[UNKNOWN_ERROR]: errors => {
		return errors.map(e => {
			const {Message, message = Message, code} = e;
			return message || (code && !t.isMissing(code) && t(code)) || t('unknown');
		});
	}
};


export default function getMessages (errors) {
	// validation error or unknown
	const byType = categorize(errors);

	return Object.entries(byType)
		.map(([type, errs]) => (
			arr((handlers[type] || noop)(errs))
		))
		.reduce((acc, chunk) => [...acc, ...chunk], [])
		.filter(Boolean);
}
