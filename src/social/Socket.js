import EventEmitter from 'events';

const Bus = new EventEmitter();
const IncomingEvent = 'incoming-event';
const PresenceChanged = 'presence-changed';

export function subscribeToIncomingMessage(fn) {
	Bus.addListener(IncomingEvent, fn);
	return () => Bus.removeListener(IncomingEvent, fn);
}

export function subscribeToPresenceChange(fn) {
	Bus.addListener(PresenceChanged, fn);
	return () => Bus.removeListener(PresenceChanged, fn);
}

export function emitIncomingMessage(sender, message) {
	Bus.emit(IncomingEvent, sender, message);
}

export function emitPresenceChanged(data) {
	Bus.emit(PresenceChanged, data);
}
