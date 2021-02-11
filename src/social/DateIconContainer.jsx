import React from 'react';
import {DateIcon} from '@nti/web-calendar';
import {Tooltip} from '@nti/web-commons';

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
				<div onClick={handleDateIconClick}>
					<DateIcon />
				</div>
			</Tooltip>

			<div ref={iconRef} />
			{calendarWindow && (
				<CalendarWindow
					onClose={handleCalendarClose}
					target={iconRef.current}
				/>
			)}
		</>
	);
}
