/* eslint-env jest */
import getGrouped from '../get-grouped-schema-fields';

const schema = {
	Username: {
		name: 'username-name',
		group: 'about-group'
	},
	about: {
		name: 'about-name',
		group: 'about-group'
	},
	alias: {
		name: 'alias',
		group: 'about-group'
	},
	role: {
		name: 'role',
		group: 'role-group'
	}
};

describe('get-grouped-schema-fields', () => {

	test('returns correct number of groups', () => {
		const grouped = getGrouped(schema, Object.keys(schema));
		expect(Object.keys(grouped)).toHaveLength(2);
	});

	test('returns correct fields in group', () => {
		const grouped = getGrouped(schema, Object.keys(schema));
		expect(grouped['about-group']).toBeDefined();
		expect(Object.keys(grouped['about-group']))
			.toEqual(expect.arrayContaining(Object.keys(schema).filter(k => schema[k].group === 'about-group')));
		expect(Object.keys(grouped['role-group']))
			.toEqual(expect.arrayContaining(Object.keys(schema).filter(k => schema[k].group === 'role-group')));
	});

	test('fields in output match schema', () => {
		const grouped = getGrouped(schema, Object.keys(schema));
		expect(grouped['about-group']).toBeDefined();
		expect(grouped['about-group'].about).toEqual(schema.about);
	});

	test('handles no schema', () => {
		const nullSchema = () => getGrouped(null, Object.keys(schema));
		const undefSchema = () => getGrouped(undefined, Object.keys(schema));

		expect(nullSchema).not.toThrow();
		expect(undefSchema).not.toThrow();
		expect(nullSchema()).toEqual({});
		expect(undefSchema()).toEqual({});
	});

	test('handles no fields', () => {
		const nullFields = () => getGrouped(schema, null);
		const undefFields = () => getGrouped(schema);

		expect(nullFields).not.toThrow();
		expect(undefFields).not.toThrow();
		expect(nullFields()).toEqual({});
		expect(undefFields()).toEqual({});
	});

	test('handles entries not present in schema', () => {
		const group = () => getGrouped(schema, ['missing-from-schema', 'about', 'also-missing']);
		expect(group).not.toThrow();
		const grouped = group();
		expect(Object.keys(grouped)).toHaveLength(1);
		expect(grouped[schema.about.group]).toBeDefined();
		expect(grouped[schema.about.group]['about']).toBeDefined();
	});

});
