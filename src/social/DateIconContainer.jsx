import { useRef } from 'react';

import { Tooltip } from '@nti/web-commons';
import { DateIcon } from '@nti/web-calendar';

import { CalendarWindowRef } from './CalendarWindow';
import Store from './Store';

export default function DateIconContainer() {
	const { setCalendarWindow, calendarWindow } = Store.useValue();

	const iconRef = useRef();

	const CalendarWindow = CalendarWindowRef.getCalendarWindow();

	const handleDateIconClick = () => {
		setCalendarWindow(!calendarWindow);
	};

	const handleCalendarClose = () => {
		setCalendarWindow(false);
	};

	return (
		<div ref={iconRef}>
			<Tooltip label="Calendar">
				<DateIcon onClick={handleDateIconClick} />
			</Tooltip>

			{iconRef.current && (
				<CalendarWindow
					onClose={handleCalendarClose}
					target={iconRef.current}
					visible={calendarWindow}
				/>
			)}
		</div>
	);
}
