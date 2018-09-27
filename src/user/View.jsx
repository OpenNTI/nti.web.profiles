import React from 'react';
import PropTypes from 'prop-types';

import getRouter from './Router';

export default function View (props) {
	const Router = getRouter(props.entity);
	return (
		<Router {...props} />
	);
}

View.propTypes = {
	entity: PropTypes.object.isRequired
};
