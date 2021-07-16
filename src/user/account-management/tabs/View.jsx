import { useState } from 'react';

import { Loading, Tabs } from '@nti/web-commons';

import Store from '../Store';

import Picture from './picture';
import Password from './Password';
import Preferences from './preferences';

// const t = scoped('nti.web-profiles.user.account-management.tabs', {
// 	picture: 'Edit Profile Picture',
// 	password: 'Change Password',
// 	preferences: 'Preferences',
// });

// const Translate = Text.Translator(t);

const tabs = [
	{
		label: 'Edit Profile Picture',
		component: () => <Picture />,
	},

	{
		label: 'Change Password',
		component: () => <Password />,
	},

	{
		label: 'Preferences',
		component: () => <Preferences />,
	},
];

export default function TabsView() {
	const { loading } = Store.useValue();
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = tab => {
		setActiveTab(tab);
	};

	const ActiveTab = tabs[activeTab].component;

	return (
		<>
			<Tabs.Tabs active={activeTab} onChange={handleTabChange}>
				{tabs.map(({ label }, index) => (
					<Tabs.Tab key={index} label={label} />
				))}
			</Tabs.Tabs>

			<Tabs.TabContent active>
				<Loading.Placeholder
					loading={loading}
					fallback={<Loading.Spinner.Large />}
				>
					<ActiveTab />
				</Loading.Placeholder>
			</Tabs.TabContent>
		</>
	);
}
