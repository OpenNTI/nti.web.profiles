import React, { Suspense } from 'react';

import { Prompt } from '@nti/web-commons';
import { useStoreValue } from '@nti/lib-store';

import { UserAwardedCreditView } from './View';

export const PropGrabber = ({ children, ...props }) => children(props);

export function UserAwardedCreditDialog({
	entity,
	credit = null,
	onBeforeDismiss,
}) {
	const { getEntity } = useStoreValue();
	return (
		<Prompt.Dialog
			className="user-awarded-view-container"
			onBeforeDismiss={onBeforeDismiss}
			css={css`
				@media (max-width: 600px) {
					background-color: white;
					dialog {
						width: 100%;
						height: 100%;
					}
				}

				& > :global(.icon-close) {
					display: none;
				}
			`}
		>
			<PropGrabber>
				{props => (
					<Suspense fallback={<div />}>
						<UserAwardedCreditView
							entity={entity ?? getEntity()}
							credit={credit}
							onDismiss={props.onDismiss}
						/>
					</Suspense>
				)}
			</PropGrabber>
		</Prompt.Dialog>
	);
}
