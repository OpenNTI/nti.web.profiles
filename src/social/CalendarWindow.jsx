// import React from 'react';

let ref = null;

CalendarWindowRef.setCalendarWindow = window => (ref = window);
CalendarWindowRef.getCalendarWindow = () => ref;

export function CalendarWindowRef() {
	return null;
}
