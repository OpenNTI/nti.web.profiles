import { Suspense, useState } from 'react';

import { Loading, Tabs } from '@nti/web-commons';

import { Picture } from './picture/View';
import { Password } from './Password';
import { Preferences } from './preferences/View';

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
		testId: 'picture-tab',
	},

	{
		label: 'Change Password',
		component: () => <Password />,
		testId: 'password-tab',
	},

	{
		label: 'Preferences',
		component: () => <Preferences />,
		testId: 'preferences-tab',
	},
];

export function TabsView() {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = tab => {
		setActiveTab(tab);
	};

	const ActiveTab = tabs[activeTab].component;

	return (
		<Suspense fallback={<Loading.Spinner.Large />}>
			<Tabs.Tabs active={activeTab} onChange={handleTabChange}>
				{tabs.map(({ label, testId }, index) => (
					<Tabs.Tab key={index} label={label} data-testid={testId} />
				))}
			</Tabs.Tabs>

			<Tabs.TabContent active>
				<ActiveTab />
			</Tabs.TabContent>
		</Suspense>
	);
}
