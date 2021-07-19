import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

import Field from './Field';

const Fieldset = styled.fieldset`
	border: 1px solid var(--border-grey);
	margin-bottom: 20px;
`;

const Legend = styled.legend`
	color: var(--secondary-grey);
	font: normal 600 0.9em var(--body-font-family);
`;

const t = scoped('nti.web-profiles.user.account-management.tabs.Preferences', {
	WebApp: {
		title: 'Accessibility',
		useHighContrast: 'Enable High Contrast Mode.',
	},
	PushNotificationsEmail: {
		title: 'Communications',
		email_a_summary_of_interesting_changes:
			'Send me email notifications about activity I may have missed.',
		immediate_threadable_reply:
			'Send me email notifications when someone @mentions me.',
		notify_on_mention: 'Send me email notifications when I am replied to.',
	},
	BadgesCourse: {
		title: 'Badges',
		show_course_badges:
			'Make badges earned for completing a course public.',
	},
});

Section.propType = {
	name: PropTypes.string.isRequired,
	fields: PropTypes.array.isRequired,
};

export default function Section({ name, fields }) {
	return (
		<Fieldset>
			<Legend>{t(`${name}.title`)}</Legend>
			<>
				{fields?.map(field => (
					<Field
						key={field}
						name={field}
						collection={name}
						label={t(`${name}.${field}`)}
					/>
				))}
			</>
		</Fieldset>
	);
}
