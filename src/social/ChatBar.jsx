import React, { useState } from 'react';

import Store from './Store';
import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';
import DateIconContainer from './DateIconContainer';

export const ChatBar = Store.compose(
	React.forwardRef((props, ref) => {
		const [expanded, setExpanded] = useState(false);

		const toggleExpanded = () => setExpanded(current => !current);

		const Cmp = expanded ? ExpandedPanel : CollapsedPanel;

		return (
			<Cmp toggle={toggleExpanded}>
				<DateIconContainer />
			</Cmp>
		);
	})
);
