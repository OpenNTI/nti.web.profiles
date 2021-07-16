import { useEffect } from 'react';

import { Checkbox, User } from '@nti/web-commons';
import { getConfig } from '@nti/web-client';
import { addStyleSheet } from '@nti/lib-dom';

export default function Field({ name, collection, label }) {
	const key = `${collection}.${name}`;
	const [preference, setPreference] = User.usePreference(key);

	/* Add/Remove accessibility stylesheet on useHighContrast change */
	useEffect(() => {
		const listenForChange = async () => {
			if (name === 'useHighContrast' && preference) {
				const basepath = getConfig('basepath') ?? '/';
				if (preference) {
					await addStyleSheet(
						URL.join(basepath, '/resources/css/accessibility.css'),
						'main-stylesheet'
					);
				} else {
					await addStyleSheet(
						URL.join(basepath, '/resources/css/legacy.css'),
						'main-stylesheet'
					);
				}
			}
		};
		listenForChange();
	}, [preference]);

	return (
		<Checkbox
			checked={preference}
			onChange={value => setPreference(value)}
			label={label}
		/>
	);
}
