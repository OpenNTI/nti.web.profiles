import React from 'react';
import {DateIcon} from '@nti/web-calendar';
import {Hooks} from '@nti/web-commons';

import ChatIcon from './Icon';
import Store from './Store';
import VerticalPanel from './Panel';

export default function ChatPanel () {
	const {
		load
	} = Store.useValue();

	useEffect(() => {
		load();
	}, [load]);

	const matches = Hooks.useMatchesMediaQuery('(min-width: 1200px)');

	const {visible, setVisible} = useState(false);
	const {expanded, setExpanded} = useState(false);

	return (
		<ChatIcon onClick={setVisible(!visible)} visible={!matches}>
			{(visible || matches) && (
				<VerticalPanel expanded={expanded} setExpanded={(val) => setExpanded(val)}>
					<DateIcon />
				</VerticalPanel>
			)}
		</ChatIcon>
	);
}
