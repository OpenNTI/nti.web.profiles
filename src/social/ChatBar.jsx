import React, { useImperativeHandle, useState } from 'react';

import Store from './Store';
import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';
import DateIconContainer from './DateIconContainer';
import { ChatWindowRef } from './ChatWindow';

// Store.compose needs a Ref-able component, so make it ref-able by wrapping in a forwardRef.
const ChatBarImpl = React.forwardRef((props, ref) => {
	const { selectedEntity, setSelectedEntity } = Store.useValue();

	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(current => !current);

	const Cmp = expanded ? ExpandedPanel : CollapsedPanel;

	const ChatWindow = ChatWindowRef.getChatWindow();

	// I'm just adding useImperativeHandle to 'consume' the ref...
	// since there isn't really anything we want to add the ref to.
	// This allows for the potential of adding methods to
	// expand/collapse/etc from the ref in the consuming component.
	useImperativeHandle(ref, () => ({
		// public api
		// collapse () {}
		// currently: expanded ? 'expanded' : 'collapsed',
		// expand () {}
		// selected: ...
		// etc...
	}));

	return (
		<>
			<Cmp toggle={toggleExpanded}>
				<DateIconContainer />
			</Cmp>
			{ChatWindow && (
				<ChatWindow
					data-testid="chat-window"
					onClose={() => setSelectedEntity()}
					entity={selectedEntity}
					expanded={expanded}
				/>
			)}
		</>
	);
});

export const ChatBar = Store.compose(ChatBarImpl);
