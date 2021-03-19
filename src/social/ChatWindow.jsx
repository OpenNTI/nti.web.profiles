// import React from 'react';

let ref = null;

ChatWindowRef.setChatWindow = window => (ref = window);
ChatWindowRef.getChatWindow = () => ref;

export function ChatWindowRef() {
	return null;
}
