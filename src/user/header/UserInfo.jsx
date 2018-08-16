import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@nti/web-commons';

import Social from './Social';
import Summary from './Summary';


export default function UserInfo ({entity}) {
	return (
		<React.Fragment>
			<Avatar entity={entity} />
			<Summary entity={entity} />
			<Social entity={entity} />
		</React.Fragment>
	);
}

UserInfo.propTypes = {
	entity: PropTypes.object.isRequired
};
