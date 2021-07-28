import React, { Suspense, useState } from 'react';

import { Loading, Prompt, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Tabs from './tabs';
import Header from './Header';

const t = scoped('nti.web.profiles.user.account-management.modal', {
	title: 'Manage Account',
});

const Translate = Text.Translator(t);

const Modal = styled(Prompt.BaseWindow)`
	width: 533px;
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
				>
					<Suspense fallback={<Loading.Spinner.Large />}>
						<Modal
							title={<Translate localeKey="title" />}
							doClose={handleClose}
							buttons={[]}
						>
							<Header />
							<Tabs />
						</Modal>
					</Suspense>
				</Prompt.Dialog>
			)}
		</>
	);
});

export default AccountPrompt;
