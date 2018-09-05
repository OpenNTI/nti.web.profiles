import React from 'react';

import getRouter from './Router';

export default function View (props) {
	const Router = getRouter(props.entity);
	return (
		<Router {...props} />
	);
}
