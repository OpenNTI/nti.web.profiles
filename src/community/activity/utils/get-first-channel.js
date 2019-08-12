function getFirstChannelList (channels) {
	if (Array.isArray(channels)) { return channels[0]; }

	return channels;
}

export default function getFirstChannel (channelLists) {
	const channelList = getFirstChannelList(channelLists);

	return channelList && channelList.channels && channelList.channels[0];
}