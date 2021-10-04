import React from 'react';

import { scoped } from '@nti/lib-locale';
import { Prompt, Flyout, useToggle } from '@nti/web-commons';
import { useStoreValue } from '@nti/lib-store';

import { PropGrabber, UserAwardedCreditDialog } from '../../userawarded/Dialog';

const t = scoped('nti-web-profile.transcripts.table.columns.Options', {
	edit: 'Edit',
	delete: 'Delete',
});

const Trigger = React.forwardRef((props, ref) => (
	<div className="credit-row-option-trigger" {...props} ref={ref}>
		<i className="icon-settings" />
	</div>
));

Options.cssClassName = 'options-col';

export default function Options({ item }) {
	const [edit, toggleEdit] = useToggle();
	const { deleteUserAwardedCredit } = useStoreValue();

	const handleDelete = () => {
		Prompt.areYouSure('Do you want to delete this credit?').then(() => {
			deleteUserAwardedCredit(item);
		});
	};

	if (!item.isAddRow && item.hasLink('edit')) {
		return (
			<>
				<Flyout.Triggered
					className="credit-row-options"
					trigger={<Trigger />}
					horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
				>
					<PropGrabber>
						{({ dismissFlyout }) => (
							<div>
								<div
									className="credit-row-option"
									onClick={() => (
										dismissFlyout(), toggleEdit()
									)}
								>
									{t('edit')}
								</div>
								<div
									className="credit-row-option delete"
									onClick={handleDelete}
								>
									{t('delete')}
								</div>
							</div>
						)}
					</PropGrabber>
				</Flyout.Triggered>
				{edit && (
					<UserAwardedCreditDialog
						onBeforeDismiss={toggleEdit}
						credit={item}
					/>
				)}
			</>
		);
	}

	return null;
}
