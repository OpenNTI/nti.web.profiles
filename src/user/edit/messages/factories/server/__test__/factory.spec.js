/* eslint-env jest */
import {getLocale, registerTranslations} from '@nti/lib-locale';

import getMessages from '../factory';

const INVALID_START_YEAR = 'Invalid position start year.';
const INVALID_END_YEAR = 'Invalid position end year.';
const GENERIC_INVALID_VALUE_SINGULAR = 'Unable to save. Your submission included an invalid value.';
const GENERIC_INVALID_VALUE_PLURAL = 'Unable to save. Your submission included invalid values.';

const localeStrings = {
	'nti-profile-edit': {
		'server-error-messages': {
			RequiredMissing: {
				one: '---The %(fields)s field is required.---',
				other: '---These fields are required: %(fields)s---'
			},
			UnspecifiedValidationError: {
				one: GENERIC_INVALID_VALUE_SINGULAR,
				other: GENERIC_INVALID_VALUE_PLURAL
			}
		}
	}
};

registerTranslations(getLocale(), localeStrings);


describe('server message factory test', () => {

	test('Test single validation error', () => {
		const error = {
			ValidationErrors: [
				{
					code: 'InvalidStartYear',
					message: INVALID_START_YEAR
				}
			],
		};

		const results = getMessages(error);

		expect(results.length).toEqual(1);
		expect(results[0]).toEqual(INVALID_START_YEAR);
	});

	test('Test multiple validation errors', () => {
		const error = {
			ValidationErrors: [
				{
					code: 'InvalidStartYear',
					message: INVALID_START_YEAR
				},
				{
					code: 'InvalidEndYear',
					message: INVALID_END_YEAR
				}
			],
		};

		const results = getMessages(error);

		expect(results).toHaveLength(1);
		expect(results[0]).toEqual(GENERIC_INVALID_VALUE_PLURAL);
	});

	test('Test single validation error, no messages', () => {
		const error = {
			ValidationErrors: [
				{
					code: 'InvalidStartYear'
				}
			],
		};

		const results = getMessages(error);

		expect(results.length).toEqual(1);
		expect(results[0]).toEqual(GENERIC_INVALID_VALUE_SINGULAR);
	});

	test('Test multiple validation errors, no messages', () => {
		const error = {
			ValidationErrors: [
				{
					code: 'InvalidStartYear'
				},
				{
					code: 'InvalidEndYear'
				}
			],
		};

		const results = getMessages(error);

		expect(results.length).toEqual(1);
		expect(results[0]).toEqual(GENERIC_INVALID_VALUE_PLURAL);
	});

	test('Test multiple required missing validation errors', () => {
		const error = {
			ValidationErrors: [
				{
					code: 'RequiredMissing',
					field: 'school'
				},
				{
					code: 'RequiredMissing',
					field: 'name'
				}
			],
		};

		const results = getMessages(error);

		expect(results.length).toEqual(1);
		expect(results[0]).toEqual('---These fields are required: school, name---');
	});

	test('error is itself a validation error', () => {
		const field = 'school';
		const error = {
			statusCode: 422,
			code: 'RequiredMissing',
			field
		};

		const messages = getMessages(error);
		expect(messages).toHaveLength(1);
		expect(messages[0]).toEqual(`---The ${field} field is required.---`);
	});
});
