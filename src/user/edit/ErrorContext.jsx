import React from 'react';

/**
 * Provides a mechanism for components that might be deeply nested to report
 * validation (or other) errors without having to connect to the store or know
 * how the errors are handled at the top.
 *
 * Each section or logical grouping of fields can set the error context (e.g. "Education") to
 * indicate where the error occurred.
 *
 * @param error: the error being reported
 * @param where: information about where the error occurred (e.g. inside "Education" section, etc.)
 */
export default React.createContext({
	onError: (error, where) => {},
});
