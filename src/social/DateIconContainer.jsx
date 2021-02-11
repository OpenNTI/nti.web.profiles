import React from 'react';
import {DateIcon} from '@nti/web-calendar';

import CalendarWindowView from './CalendarWindow';
import Store from './Store';

export default function DateIconContainer () {
	const {
		setCalendarWindow,
		calendarWindow,
	} = Store.useValue();

	const iconRef = React.useRef();

	const CalendarWindow = CalendarWindowView.getCalendarWindow();

	const handleDateIconClick = () => {
		setCalendarWindow(!calendarWindow);
	};

	const handleCalendarClose = () => {
		setCalendarWindow(false);
	};

	return (
		<>
			<div onClick={handleDateIconClick}>
				<DateIcon />
			</div>
			<div ref={iconRef}/>
			{calendarWindow && <CalendarWindow onClose={handleCalendarClose} target={iconRef.current} />}
		</>
	);
}
