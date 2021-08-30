import { Suspense } from 'react';

import { useRealService } from '@nti/web-client/storybook-utils';

import { AccountManagement } from '../View';

export default {
	title: 'Account Management',
	component: AccountManagement,
};

export function Main() {
	useRealService();
	return (
		<Suspense fallback={<div />}>
			<AccountManagement />
		</Suspense>
	);
}
