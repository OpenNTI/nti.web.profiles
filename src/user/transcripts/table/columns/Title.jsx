import React, { Suspense } from 'react';

import { scoped } from '@nti/lib-locale';
import { useToggle, Prompt } from '@nti/web-commons';
import { useStoreValue } from '@nti/lib-store';

import UserAwardedCredit from '../../userawarded/View';

import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Title', {
	headerTitle: 'Title',
});

const PropGrabber = ({ children, ...props }) => children(props);

Title.cssClassName = 'title-col';

Title.HeaderComponent = () => <div>{t('headerTitle')}</div>;

export default function Title({ item }) {
	const { getEntity } = useStoreValue();
	const [show, toggle] = useToggle();

	return !item.isAddRow ? (
		<DetailViewable item={item}>
			<div className="transcript-row-title">{item.title}</div>
		</DetailViewable>
	) : (
		<>
			<div className="transcript-add-row" onClick={toggle}>
				<div className="add-icon">
					<i className="icon-add" />
				</div>
				<div className="add-label">Add Credit</div>
			</div>
			{show && (
				<Prompt.Dialog
					className="user-awarded-view-container"
					onBeforeDismiss={toggle}
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
								<UserAwardedCredit
									entity={getEntity()}
									credit={null}
									onDismiss={props.onDismiss}
								/>
							</Suspense>
						)}
					</PropGrabber>
				</Prompt.Dialog>
			)}
		</>
	);
}
