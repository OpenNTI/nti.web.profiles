import { scoped } from '@nti/lib-locale';

const Container = styled.div`
	padding: 20px;
	max-width: 500px;
`;

const Title = styled.div`
	color: var(--primary-grey);
	font-size: 24px;
	font-weight: 400;
	font-style: italic;
`;

const SubText = styled.div`
	font-size: 14px;
	font-style: normal;
	font-weight: 300;
`;

const t = scoped(
	'nti.web-profiles.user.account-management.tabs.password.ChangeDisallowed',
	{
		title: 'Resetting your password is not allowed.',
		subtext:
			'You are not allowed to change your password at this time.Please contact support to request a password change.',
	}
);

export function ChangeDisallowed() {
	return (
		<Container data-testid="password-change-disallowed">
			<Title>{t('title')}</Title>
			<SubText>{t('subtext')}</SubText>
		</Container>
	);
}
