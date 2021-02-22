/* eslint-env jest */
jest.mock('@nti/util-logger', () => {
	const logger = {
		warn: jest.fn(() => {}),
	};

	return { get: () => logger };
});

import React from 'react';
import TestRenderer from 'react-test-renderer';
import Logger from '@nti/util-logger';

import Messages from '../Messages';

describe('Messages', () => {
	const error = {
		name: 'mock error',
		validity: {
			valueMissing: true,
		},
	};

	const testRender = props => TestRenderer.create(<Messages {...props} />);

	test('returns null when given no messages', () => {
		const instance = testRender();
		expect(instance.toJSON()).toBeNull();
	});

	test('renders a message for each validation error context (each "where" value)', () => {
		const wheres = ['about', 'education', 'professional'];
		const fieldErrors = wheres.map(where => ({
			where,
			error,
		}));

		const instance = testRender({ fieldErrors });
		expect(instance.root.findAllByType('li')).toHaveLength(wheres.length);
	});

	test('groups validation errors of the same type and context', () => {
		const wheres = ['about', 'about', 'about', 'education'];
		const fieldErrors = wheres.map(where => ({
			where,
			error,
		}));

		const instance = testRender({ fieldErrors });
		expect(instance.root.findAllByType('li')).toHaveLength(2);
	});

	test('handles null entries in the errors array', () => {
		const fieldErrors = [null];
		const render = () => testRender({ fieldErrors });
		expect(render).not.toThrow();
	});

	test('ignores unrecognized errors and logs a warning', () => {
		const fieldErrors = [
			{
				foo: 'unknown error type',
			},
		];

		const render = () => testRender({ fieldErrors });
		expect(render).not.toThrow();
		expect(Logger.get().warn).toHaveBeenCalled();
	});

	test('handles non-object errors and logs a warning', () => {
		const fieldErrors = ['string', 123, true];

		const render = () => testRender({ fieldErrors });
		expect(render).not.toThrow();
		expect(Logger.get().warn).toHaveBeenCalled();
	});
});
