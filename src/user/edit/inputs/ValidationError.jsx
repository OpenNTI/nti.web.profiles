import './ValidationError.scss';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

const t = scoped('nti-web-profile.user-profile.edit.validation-error', {
	badInput: 'Invalid',
	patternMismatch: 'Invalid',
	rangeOverflow: 'Invalid',
	rangeUnderflow: 'Invalid',
	stepMismatch: 'Invalid',
	tooLong: 'Too Long',
	tooShort: 'Too Short',
	typeMismatch: 'Invalid',
	valueMissing: 'Required',
});

const omitted = ['valid', 'customError'];
const getValidityStateReasons = () =>
	Object.keys(ValidityState.prototype).filter(x => !omitted.includes(x));
const getFirstValidationError = v => getValidityStateReasons().find(x => v[x]);

export default function ValidationError({ error: { validity, message } = {} }) {
	const issue = getFirstValidationError(validity);

	if (!issue || validity.valid) {
		return null;
	}

	const display = validity.customError
		? message
		: issue && !t.isMissing(issue)
		? t(issue)
		: message;

	return <div className="nti-profile-validation-error">{display}</div>;
}

ValidationError.propTypes = {
	error: PropTypes.shape({
		validity: PropTypes.object,
		message: PropTypes.string,
	}),
};
