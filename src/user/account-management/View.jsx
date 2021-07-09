import React, { useEffect } from 'react';

import { Loading, Prompt, Text } from '@nti/web-commons';
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

const AccountMangerPrompt = React.forwardRef(function AccountMangerPrompt(
	{ handleClose },
	ref
) {
	const { load, loading } = Store.useValue();

	useEffect(() => {
		load();
	}, [load]);

	return (
		<Prompt.Dialog
			closeOnMaskClick={false}
			closeOnEscape={true}
			onBeforeDismiss={handleClose}
		>
			<Loading.Placeholder
				fallback={<Loading.Spinner.Large />}
				loading={loading}
			>
				<Modal
					title={<Translate localeKey="title" />}
					doClose={handleClose}
					buttons={[]}
				>
					<Header />
					<Tabs />
				</Modal>
			</Loading.Placeholder>
		</Prompt.Dialog>
	);
});

export default Store.compose(AccountMangerPrompt);
