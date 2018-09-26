/* eslint-env jest */
import slugify from '../slugify';

describe('slugify', () => {
	test('transforms camelCase to hyphenated', () => {
		expect(slugify('camelCase')).toEqual('camel-case');
		expect(slugify('multiWordCamelCase')).toEqual('multi-word-camel-case');
	});

	test('handles sequential uppercase characters', () => {
		expect(slugify('UPPERCASE')).toEqual('uppercase');
	});

	test('replaces spaces with hyphens', () => {
		expect(slugify('foo bar')).toEqual('foo-bar');
		expect(slugify('foo bar baz')).toEqual('foo-bar-baz');
	});

	test('replaces underscores with hyphens', () => {
		expect(slugify('foo_bar')).toEqual('foo-bar');
		expect(slugify('foo_bar_baz')).toEqual('foo-bar-baz');
	});

	test('replaces punctuation with hyphens', () => {
		expect(slugify('foo!bar')).toEqual('foo-bar');
		expect(slugify('foo!bar?baz')).toEqual('foo-bar-baz');
	});

	test('strips leading and trailing punctuation, whitespace, underscores', () => {
		expect(slugify('.foo!bar.')).toEqual('foo-bar');
		expect(slugify('?foo!bar?baz!')).toEqual('foo-bar-baz');
		expect(slugify('_  ?foo!bar?baz!  	')).toEqual('foo-bar-baz');
	});

	test('handles bad input', () => {
		expect(slugify()).toBeFalsy();
		expect(slugify(null)).toBeFalsy();
		expect(slugify(1)).toBeFalsy();
		expect(slugify(true)).toBeFalsy();
		expect(slugify({})).toBeFalsy();
	});
});
