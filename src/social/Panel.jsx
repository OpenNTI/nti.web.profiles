import PropTypes from 'prop-types';
import React from 'react';

import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';

VerticalPanel.propTypes = {
	expanded: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
};

export default function VerticalPanel ( { expanded, children, toggle } ) {
	return (
		expanded ? (
			<ExpandedPanel collapse={toggle} />
		) : (
			<CollapsedPanel expand={toggle}>{children}</CollapsedPanel>
		)
	);
}
