import React, { useState } from 'react';

import { Prompt, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Tabs from './tabs';
import Header from './Header';

const t = scoped('nti.web.profiles.user.account-management.modal', {
	title: 'Manage Account',
});

const Translate = Text.Translator(t);

const Modal = styled(Prompt.BaseWindow)`
	width: fit-content;
	top: 10vh;
`;

const AccountPrompt = React.forwardRef((props, ref) => {
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
						<Tabs />
					</Modal>
				</Prompt.Dialog>
			)}
		</>
	);
});

export default AccountPrompt;
