import { Suspense } from 'react';

import { setupTestClient } from '@nti/web-client/test-utils';

import { Menu } from '../menus.jsx';
import { PresenceSelect } from '../Presence';

const styles = stylesheet`
	.wrapper {
		max-width: 300px;
	}
`;

setupTestClient({
	capabilities: { canChat: true },
	getUserPreferences() {
		return {
			addListener() {},
			get() {},
		};
	},
});

export default {
	title: 'Presence Selection',
	component: PresenceSelect,
};

export function Test() {
	return (
		<Suspense fallback={<div />}>
			<Menu className={styles.wrapper}>
				<PresenceSelect />
			</Menu>
		</Suspense>
	);
}
