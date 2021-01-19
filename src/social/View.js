import React, {useEffect, useState} from 'react';
import {DateIcon} from '@nti/web-calendar';
import {Hooks} from '@nti/web-commons';

import {Icon} from './parts';
import Store from './Store';
import VerticalPanel from './Panel';

export default function View () {
	const {
		load
	} = Store.useValue();

	useEffect(() => {
		load();
	}, [load]);

	const matches = Hooks.useMatchesMediaQuery('(min-width: 1200px)');

	const [visible, setVisible] = useState(false);

	const [expanded, setExpanded] = useState(false);

	const toggleVisible = () => setVisible(current => !current);

	const toggleExpanded = () => setExpanded(current => !current);

	return (
		<>
			{!matches && <Icon onClick={toggleVisible} />}

			{(visible || matches) && (
				<VerticalPanel expanded={expanded} toggle={toggleExpanded}>
					<DateIcon />
				</VerticalPanel>
			)}
		</>
	);
}
