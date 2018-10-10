/* eslint-env jest */
import addGroups from '../add-groups-to-schema';

const schema = {
	Username: {},
	about: {},
	alias: {},
	role: {}
};

const groups = {
	role: 'role',
	about: [
		'about',
		'alias'
	]
};

describe('add-groups-to-schema', () => {

	test('adds groups to schema entries', () => {
		const s = addGroups(schema, groups);
		expect(groups.about.every(field => (s[field] || {}).group === 'about')).toBe(true);
	});

	test('output includes all input schema fields', () => {
		const s = addGroups(schema, groups);
		expect(Object.keys(s)).toEqual(expect.arrayContaining(Object.keys(schema)));
	});
});
