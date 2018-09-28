/* eslint-env jest */
import ensureArray from '../ensure-array';

describe('slugify', () => {
	test('handles null', () => {
		const result = ensureArray(null);
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(0);
	});

	test('handles no argument', () => {
		const result = ensureArray();
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(0);
	});

	test('returns input when already an array', () => {
		const a = [1,2,3];
		expect(ensureArray(a)).toEqual(a);
	});

	test('returns array from non-array input', () => {
		const string = 'x';
		const obj = {test: 12345};
		const num = 12;
		expect(ensureArray(string)).toEqual(expect.arrayContaining([string]));
		expect(ensureArray(obj)).toEqual(expect.arrayContaining([obj]));
		expect(ensureArray(num)).toEqual(expect.arrayContaining([num]));
	});

	test('handles boolean input', () => {
		expect(ensureArray(true)).toEqual(expect.arrayContaining([true]));
		expect(ensureArray(false)).toEqual(expect.arrayContaining([false]));
	});
});
