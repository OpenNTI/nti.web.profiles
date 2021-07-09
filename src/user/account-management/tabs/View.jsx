import { useState } from 'react';

import { Tabs } from '@nti/web-commons';

import Picture from './picture';
import Password from './password';
import Preferences from './preferences';

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
				<ActiveTab />
			</Tabs.TabContent>
		</>
	);
}
