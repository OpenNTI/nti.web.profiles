import React, { Suspense, useCallback } from 'react';

import { Loading, Prompt, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { TabsView } from './tabs/View';
import { Header } from './Header';

const t = scoped('nti.web.profiles.user.account-management.modal', {
	title: 'Manage Account',
});

const Translate = Text.Translator(t);

const Modal = styled(Prompt.BaseWindow)`
	max-width: 500px;
`;

export const AccountManagement = React.forwardRef(({ onClose }, ref) => {
	const handleClose = useCallback(() => void onClose?.(), [onClose]);

	return (
		<Suspense fallback={<Loading.Spinner />}>
			{prompt && (
				<Prompt.Dialog
					closeOnMaskClick={false}
					closeOnEscape={true}
					onBeforeDismiss={handleClose}
				>
					<Modal
						title={<Translate localeKey="title" />}
						doClose={handleClose}
						buttons={[]}
					>
						<Header />
						<TabsView />
					</Modal>
				</Prompt.Dialog>
			)}
		</Suspense>
	);
});
