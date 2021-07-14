import React, { useEffect, useState } from 'react';

import { Prompt, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Tabs from './tabs';
import Header from './Header';
import Store from './Store';

const t = scoped('nti.web.profiles.user.account-management.modal', {
	title: 'Manage Account',
});

const Translate = Text.Translator(t);

const Modal = styled(Prompt.BaseWindow)`
	width: 533px;
`;

function AccountMangerPrompt() {
	const [prompt, setPrompt] = useState(true);
	const { load } = Store.useValue();

	const handleClose = () => setPrompt(false);

	useEffect(() => {
		load();
	}, [load]);

	return (
		<>
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
						<Tabs />
					</Modal>
				</Prompt.Dialog>
			)}
		</>
	);
}

export default Store.compose(AccountMangerPrompt);
