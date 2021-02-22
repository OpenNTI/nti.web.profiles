import React, { useState } from 'react';
import { DateIcon } from '@nti/web-calendar';

import Store from './Store';
import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';

function View() {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(current => !current);

	const Cmp = expanded ? ExpandedPanel : CollapsedPanel;

	return (
		<Cmp toggle={toggleExpanded}>
			<DateIcon label={'Calendar'} />
		</Cmp>
	);
}

export default Store.compose(View);
