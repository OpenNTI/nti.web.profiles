import Section from './Section';

const Container = styled.div`
	padding: 20px;
`;

const preferencesArray = [
	{ name: 'WebApp', items: ['useHighContrast'] },
	{
		name: 'PushNotifications.Email',
		items: [
			'email_a_summary_of_interesting_changes',
			'immediate_threadable_reply',
			'notify_on_mention',
		],
	},
	{
		name: 'BadgesCourse',
		items: ['show_course_badges'],
	},
];

export default function PreferencesView() {
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
