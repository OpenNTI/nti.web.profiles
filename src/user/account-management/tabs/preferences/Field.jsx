import React from 'react';

import { Checkbox, User } from '@nti/web-commons';
import { getConfig } from '@nti/web-client';
import { addStyleSheet } from '@nti/lib-dom';
import { URL } from '@nti/lib-commons';

const Container = styled.div`
	margin: 0.5em;
	color: var(--secondary-grey);
	font: normal normal 0.9em/2 var(--body-font-family);
`;

export default function Field({ name, collection, label }) {
	const key = `${collection}.${name}`;
	const [preference, setPreference] = User.usePreference(key);

	const onChange = React.useCallback(
		async e => {
			setPreference(e.target.checked);

			if (name === 'useHighContrast') {
				const basepath = getConfig('basepath') ?? '/';
				if (preference) {
					await addStyleSheet(
						URL.join(basepath, '/resources/css/legacy.css'),
						'main-stylesheet'
					);
				} else {
					await addStyleSheet(
						URL.join(basepath, '/resources/css/accessibility.css'),
						'main-stylesheet'
					);
				}
			}
		},
		[preference, setPreference]
	);

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
