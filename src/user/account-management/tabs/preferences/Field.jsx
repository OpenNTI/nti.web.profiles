import React from 'react';

import { Checkbox, User } from '@nti/web-commons';
import { getConfig } from '@nti/web-client';
import { addStyleSheet } from '@nti/lib-dom';
import { url } from '@nti/lib-commons';

const Container = styled.div`
	margin: 0.5em;
	color: var(--secondary-grey);
	font: normal normal 0.9em/2 var(--body-font-family);
`;

export function Field({ name, collection, label }) {
	const key = `${collection}.${name}`;
	const [preference, setPreference] = User.usePreference(key);

	const onChange = React.useCallback(
		e => {
			setPreference(e.target.checked);

			if (name === 'useHighContrast') {
				const basepath = getConfig('basepath') ?? '/';
				if (preference) {
					document
						.querySelector("head link[href$='accessibility.css']")
						?.remove();
				} else {
					addStyleSheet(
						url.join(basepath, '/resources/css/accessibility.css')
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
