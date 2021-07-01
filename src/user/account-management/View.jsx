import { Prompt } from '@nti/web-commons';

import Tabs from './tabs';
import Header from './header';
import Store from './Store';

const Modal = styled(Prompt.Dialog)`
	width: 533px;
`;

function AccountManagerModal() {
	return (
		<Modal
			closeOnMaskClick={false}
			closeOnEscape={true}>
				<Header />
				<Tabs />
		</Modal>
	);
}

export default Store.compose(AccountManagerModal);
