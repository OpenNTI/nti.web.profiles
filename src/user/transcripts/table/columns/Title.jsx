import React from 'react';

import { scoped } from '@nti/lib-locale';
import { useToggle } from '@nti/web-commons';

import { UserAwardedCreditDialog } from '../../userawarded/Dialog';

import { DetailViewable } from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Title', {
	headerTitle: 'Title',
});

Title.cssClassName = 'title-col';

Title.HeaderComponent = () => <div>{t('headerTitle')}</div>;

export default function Title({ item }) {
	const [show, toggle] = useToggle();

	return !item.isAddRow ? (
		<DetailViewable item={item} className="transcript-row-title">
			{item.title}
		</DetailViewable>
	) : (
		<>
			<div className="transcript-add-row" onClick={toggle}>
				<div className="add-icon">
					<i className="icon-add" />
				</div>
				<div className="add-label">Add Credit</div>
			</div>
			{show && <UserAwardedCreditDialog onBeforeDismiss={toggle} />}
		</>
	);
}
