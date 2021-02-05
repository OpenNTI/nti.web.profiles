import React from 'react';

let ChatWindow = null;

ChatWindowView.setChatWindow = (window) => (ChatWindow = window);
ChatWindowView.getChatWindow = () => ChatWindow;

export default function ChatWindowView () {
	return (
		<>
		</>
	);
}
