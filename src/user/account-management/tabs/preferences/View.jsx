import { Section } from './Section';

const Container = styled.div`
	padding: 20px;
`;

const preferencesArray = [
	{ name: 'WebApp', items: ['useHighContrast'] },
	{
		name: 'PushNotifications.Email',
		items: [
			'email_a_summary_of_interesting_changes',
			'notify_on_mention',
			'immediate_threadable_reply',
		],
	},
];

export function Preferences() {
	return (
		<Container>
			{preferencesArray.map(collection => (
				<Section
					key={collection.name}
					name={collection.name}
					fields={collection.items}
				/>
			))}
		</Container>
	);
}
