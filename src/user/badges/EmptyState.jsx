import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { getAppUsername } from '@nti/web-client';
import { Text, StandardUI } from '@nti/web-commons';
import { Button } from "@nti/web-core";

const t = scoped('nti-web-profile.badges.EmptyState', {
	other: 'This user has not earned any badges.',
	self: 'You have not earned any badges.',
	linkAccount: {
		trigger: 'Not seeing your Credly badge?',
		title: 'Not seeing your Credly badge?',
		description:
			'Ensure that the email address we have on file (%(email)s) is linked in your Credly account.',
		action: 'Go to Credly',
	},
});

const isAppUser = e => e.Username === getAppUsername();
const CredlyHref = 'https://www.youracclaim.com/';

const Empty = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem;
`;

const Label = styled(Text.Base)`
	font-size: 1.75rem;
	line-height: 2.375rem;
	color: var(--tertiary-grey);
	margin-bottom: 2rem;
`;

const ConnectLink = styled(Button).attrs({ plain: true })`
	font-size: 1rem;
	color: var(--primary-blue);
	cursor: pointer;
`;

const Dialog = styled.div`
	max-width: 500px;
	padding: 0 1rem 0 2rem;
`;

const Title = styled(Text.Base).attrs({ as: 'h1' })`
	font-size: 1.5rem;
	font-weight: 600;
	margin: 0 0 1rem;
	color: var(--primary-grey);
`;

const Description = styled(Text.Base).attrs({ as: 'p' })`
	color: var(--primary-grey);
`;

UserBadgeEmptyState.propTypes = {
	entity: PropTypes.object,
};
export default function UserBadgeEmptyState({ entity }) {
	const [connect, setConnect] = React.useState(false);
	const showConnect = React.useCallback(() => setConnect(true), [setConnect]);
	const hideConnect = React.useCallback(() => setConnect(false), [
		setConnect,
	]);

	const appUser = isAppUser(entity);

	return (
		<Empty>
			<Label>{appUser ? t('self') : t('other')} </Label>
			{appUser && (
				<ConnectLink onClick={showConnect}>
					{t('linkAccount.trigger')}
				</ConnectLink>
			)}
			{connect && (
				<StandardUI.Prompt.Base
					onCancel={hideConnect}
					actionHref={CredlyHref}
					actionLabel={t('linkAccount.action')}
				>
					<Dialog>
						<Title>{t('linkAccount.title')}</Title>
						<Description>
							{t('linkAccount.description', {
								email: entity.email ?? '',
							})}
						</Description>
					</Dialog>
				</StandardUI.Prompt.Base>
			)}
		</Empty>
	);
}
