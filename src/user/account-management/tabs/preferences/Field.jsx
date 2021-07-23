import React, { useEffect } from 'react';

import { Checkbox, User } from '@nti/web-commons';
import { getConfig } from '@nti/web-client';
import { addStyleSheet } from '@nti/lib-dom';
import { URL } from '@nti/lib-commons';

const Container = styled.div`
	display: inline-block;
	margin: 0.5em;
	color: var(--secondary-grey);
	font: normal normal 0.9em/2 var(--body-font-family);
`;

export default function Field({ name, collection, label }) {
	const key = `${collection}.${name}`;
	const [preference, setPreference] = User.usePreference(key);

	const isInitialMount = React.useRef(true);

	const onChange = React.useCallback(
		e => setPreference(e.target.checked),
		[preference, setPreference]
	);

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
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			listenForChange();
		}
	}, [preference]);

	return (
		<Container>
			<Checkbox
				checked={!!preference}
				onChange={onChange}
				label={label}
				data-testid={`checkbox-${name}`}
			/>
		</Container>
	);
}
