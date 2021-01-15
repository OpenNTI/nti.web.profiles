import PropTypes from 'prop-types';
import React from 'react';

import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';

VerticalPanel.propTypes = {
	expanded: PropTypes.bool.isRequired,
	setExpanded: PropTypes.func.isRequired,
};

export default function VerticalPanel ( { expanded, children, setExpanded } ) {
	return (
		expanded ? (
			<ExpandedPanel collapse={() => setExpanded(false)} />
		) : (
			<CollapsedPanel expand={() => setExpanded(true)}>{children}</CollapsedPanel>
		)
	);
}
