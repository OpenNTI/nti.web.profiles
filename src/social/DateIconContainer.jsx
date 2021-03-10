import React from 'react';

import {Tooltip, DateIcon} from '@nti/web-commons';

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
			<Tooltip label="Calendar">
				<DateIcon onClick={handleDateIconClick} ref={iconRef} />
			</Tooltip>

			{calendarWindow && iconRef.current && (
				<CalendarWindow
					onClose={handleCalendarClose}
					target={iconRef.current.parentElement}
				/>
			)}
		</>
	);
}
