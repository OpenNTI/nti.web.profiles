import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import List from './List';
import String from './String';

export default function Interests ({className, ...props}) {
	return (
		<List {...props} className={cx(className, 'nti-profile-interest-list')} component={String} includeBlank />
	);
}

Interests.propTypes = {
	className: PropTypes.string
};
