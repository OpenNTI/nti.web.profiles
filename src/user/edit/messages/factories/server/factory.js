import {scoped} from '@nti/lib-locale';
import Logger from '@nti/util-logger';

import {ensureArray as arr} from '../../../../../util';

const logger = Logger.get('nti-profiles:edit:messages:server');

const CODE_REQUIRED = 'RequiredMissing';
const CODE_INVALID = 'ConstraintNotSatisfied';
const UNSPECIFIED_VALIDATION_ERROR = 'UnspecifiedValidationError';
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
	[UNSPECIFIED_VALIDATION_ERROR]: {
		one: 'Unable to save. Your submission included an invalid value.',
		other: 'Unable to save. Your submission included an invalid values.'
	},
	[LIST_DELIMITER]: ', '
});

const localizeFieldName = name => !name ? null : t(['fieldNames', name], {fallback: name});

function getMessage ({Message, message = Message, code, ValidationErrors: validationErrors} = {}) {
	const validation = arr(validationErrors);
	if (validation.length > 0) {
		// extract an array of field names (localized)
		const fields = validation.map(({field}) => localizeFieldName(field)).filter(Boolean);

		// bail with a generic error message if we can't get the field names.
		if (fields.length === 0) { // validation errors with unidentifiable fields?
			logger.warn('Unable to identify fields in ValidationErrors. Using generic validation message.');
			return t(UNSPECIFIED_VALIDATION_ERROR, {count: validation.length});
		}

		const key = validation.every(e => e.code === CODE_REQUIRED) ? CODE_REQUIRED : CODE_INVALID;

		return t(key, {
			count: fields.length,
			fields: fields.join(t(LIST_DELIMITER, {fallback: ', '}))
		});
	}

	return message || (code && !t.isMissing(code) && t(code)) || t('unknown');
}

export default function getMessages (errors) {
	return arr(errors).map(getMessage);
}
