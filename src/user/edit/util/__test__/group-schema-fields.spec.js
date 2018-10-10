/* eslint-env jest */
jest.mock('@nti/util-logger', () => {

	const logger = ({
		info: jest.fn(() => {}),
		warn: jest.fn(() => {})
	});

	return { get: () => logger };
});

import Logger from '@nti/util-logger';

import groupFields from '../group-schema-fields';

const schema = {
	Username: {type: 'string'},
	about: {name: 'about-name'},
	alias: {name: 'alias-name'},
	role: {maxlength: 140, name: 'role-name'}
};

const groups = {
	role: 'role',
	about: [
		'about',
		'alias'
	]
};

describe('group-schema-fields', () => {

	test('output includes key for each input group', () => {
		const grouped = groupFields(schema, groups);
		const inputKeys = Object.keys(groups);
		const outputKeys = Object.keys(grouped);

		expect(outputKeys).toHaveLength(inputKeys.length);
		expect(outputKeys).toEqual(expect.arrayContaining(inputKeys));
	});

	test('places fields in correct groups', () => {
		const grouped = groupFields(schema, groups);

		expect(grouped.role).toBeDefined();
		expect(Object.keys(grouped.role)).toHaveLength(1);
		expect(grouped.role.role).toEqual(schema.role);

		expect(grouped.about).toBeDefined();
		expect(Object.keys(grouped.about)).toHaveLength(groups.about.length);
		expect(grouped.about.about).toEqual(schema.about);
		expect(grouped.about.alias).toEqual(schema.alias);

	});

	test('schema-specified group takes precedence', () => {
		const group = 'schema-specified-group';
		const sch = {...schema, about: {...schema.about, group}};
		const grouped = groupFields(sch, groups);

		expect(grouped[group]).toBeDefined();
		expect(grouped[group].about).toBeDefined();
		expect(grouped.about).toBeDefined();
		expect(Object.keys(grouped.about)).toHaveLength(Object.keys(groups.about).length - 1);
	});

	test('logs mismatched group specification', () => {
		const group = 'schema-specified-group';
		const sch = {...schema, about: {...schema.about, group}};
		groupFields(sch, groups);

		expect(Logger.get().info).toHaveBeenCalled();
	});

	test('handles fields not present in schema', () => {
		const g = {about: ['missing']};

		expect(() => groupFields(schema, g)).not.toThrow();
		const grouped = groupFields(schema, g);
		expect(Object.keys(grouped)).toHaveLength(0);
	});

	test('logs field not present in schema', () => {
		const g = {about: ['missing']};
		groupFields(schema, g);
		expect(Logger.get().info).toHaveBeenCalled();
	});
});
