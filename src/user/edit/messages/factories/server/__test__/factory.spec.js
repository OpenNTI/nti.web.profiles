/* eslint-env jest */

import getMessages from '../factory';

const INVALID_START_YEAR = 'Invalid position start year.';
const INVALID_END_YEAR = 'Invalid position end year.';
const GENERIC_INVALID_VALUE_SINGULAR = 'Unable to save. Your submission included an invalid value.';
const GENERIC_INVALID_VALUE_PLURAL = 'Unable to save. Your submission included an invalid values.';


/* eslint-env jest */
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

		expect(results.length).toEqual(2);
		expect(results[0]).toEqual(INVALID_START_YEAR);
		expect(results[1]).toEqual(INVALID_END_YEAR);
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

});
