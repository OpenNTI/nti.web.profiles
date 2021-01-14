import React from 'react';
import {DateIcon} from '@nti/web-calendar';

import ChatIcon from './Icon';
import Store from './Store';
import VerticalPanel from './Panel';

export default function ChatPanel () {
	const {
		load
	} = Store.useValues();

	useEffect(() => {
		load();
	}, [load]);

	const windowSize = useWindowSize();

	const {visible, setVisible} = useState(false);
	const {expanded, setExpanded} = useState(false);

	return (
		<ChatIcon onClick={setVisible(!visible)}>
			{(visible || windowSize > 1200) && (
				<VerticalPanel expanded={expanded} setExpanded={setExpanded(!expanded)}>
					<DateIcon />
				</VerticalPanel>
			)}
		</ChatIcon>
	);
}
