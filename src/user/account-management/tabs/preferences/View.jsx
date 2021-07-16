import Section from './Section';

const preferencesArray = [
	{ name: 'WebApp', items: ['useHighContrast'] },
	{
		name: 'PushNotificationsEmail',
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
		<>
			{preferencesArray.map(collection => (
				<Section
					key={collection.name}
					name={collection.name}
					fields={collection.items}
				/>
			))}
		</>
	);
}
