import React, { useState } from 'react';

import Store from './Store';
import ExpandedPanel from './Expanded';
import CollapsedPanel from './Collapsed';
import DateIconContainer from './DateIconContainer';
import { ChatWindowRef } from './ChatWindow';

function View() {
	const { selectedEntity, setSelectedEntity } = Store.useValue();

	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(current => !current);

	const Cmp = expanded ? ExpandedPanel : CollapsedPanel;

	const ChatWindow = ChatWindowRef.getChatWindow();

	return (
		<>
			<Cmp toggle={toggleExpanded}>
				<DateIconContainer />
			</Cmp>

			{selectedEntity && (
				<ChatWindow
					key={String(selectedEntity)}
					data-testid="chat-window"
					onClose={() => setSelectedEntity(null)}
					entity={selectedEntity}
					expanded={expanded}
				/>
			)}
		</>
	);
}

export default Store.compose(View);
