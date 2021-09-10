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
	max-width: 550px;
`;

export const AccountManagement = React.forwardRef(({ onClose }, ref) => {
	const handleClose = useCallback(() => void onClose?.(), [onClose]);

	return (
		prompt && (
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
					<Suspense fallback={<Loading.Spinner />}>
						<Header />
						<TabsView />
					</Suspense>
				</Modal>
			</Prompt.Dialog>
		)
	);
});
