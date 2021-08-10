import React, { useState } from 'react';

import { Prompt, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { TabsView } from './tabs/View';
import { Header } from './Header';

const t = scoped('nti.web.profiles.user.account-management.modal', {
	title: 'Manage Account',
});

const Translate = Text.Translator(t);

const Modal = styled(Prompt.BaseWindow)`
	width: fit-content;
	top: 10vh;
`;

export const AccountManagement = React.forwardRef((props, ref) => {
	const [prompt, setPrompt] = useState(true);

	const handleClose = () => setPrompt(false);

	return (
		<>
			{prompt && (
				<Prompt.Dialog
					closeOnMaskClick={false}
					closeOnEscape={true}
					onBeforeDismiss={handleClose}
					tall
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
		</>
	);
});
