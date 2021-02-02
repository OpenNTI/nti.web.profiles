import Logger from '@nti/util-logger';

import {ensureArray as arr} from '../../../../util';

import fieldValidation from './field-validation';
import serverError from './server';

const logger = Logger.get('nti-profiles:edit:messages');

const FIELD = 'field';
const SERVER = 'server';
const UNKNOWN = 'unknown';
const typeFor = e => (
	e.statusCode
		? SERVER
		: e.where
			? FIELD
			: UNKNOWN
);

const FACTORIES = {
	[FIELD]:  fieldValidation,
	[SERVER]: serverError
};

const unknown = (errors) => logger.warn('Unable to generate error message. Unrecognized error type. %o', errors);

/**
* Bin errors by type (e.g. field validation vs. server error)
* @param {Array} errors array of error objects
* @returns {Object} A mapping of type to errors: {server: [error, error, ...], field: [error, error, ...]}
*/
function byType (errors) {
	return arr(errors)
		.filter(Boolean)
		.reduce((acc, error) => {
			const type = typeFor(error);
			acc[type] = [...arr(acc[type]), error];
			return acc;
		}, {});
}

export default function getMessages (errors) {
	return Object.entries(byType(errors))
		.reduce((acc, [type, errs]) => {
			return [
				...arr(acc),
				...arr((FACTORIES[type] || unknown)(errs))
			];
		}, []);
}
