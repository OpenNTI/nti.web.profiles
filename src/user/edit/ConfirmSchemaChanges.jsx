import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { DialogButtons, Prompt } from '@nti/web-commons';

import Form from './Form';
import { Store, SCHEMA_CHANGES } from './Store';

const styles = stylesheet`
	.dialog :global(.modal-content) {
		width: 100%;
	}

	.confirmation {
		width: 100%;
		max-width: 640px;
		background: white;

		> header {
			padding: 2rem;
		}
	}
`;

const t = scoped('nti-profiles.user.edit.schema-change-confirmation', {
	message: {
		one:
			'The field below may need to be updated due to changes you’ve made elsewhere. Please review before continuing.',
		other:
			'The fields below may need to be updated due to changes you’ve made elsewhere. Please review before continuing.',
	},
});

const changesWeCareAbout = ['description'];

FieldChangesDialogInner.propTypes = {
	fieldGroups: PropTypes.object,
	onContinue: PropTypes.func,
	onCancel: PropTypes.func,
};
function FieldChangesDialogInner({ fieldGroups, onContinue, onCancel }) {
	const count = Object.entries(fieldGroups).reduce(
		(total, [group, fields]) => total + Object.keys(fields || {}).length,
		0
	);

	return (
		<div className={styles.confirmation}>
			<header>
				<h3>{t('message', { count })}</h3>
			</header>
			<Form
				formId="schema-change-confirmation-form"
				fieldGroups={fieldGroups}
			/>
			<DialogButtons
				buttons={[
					{
						label: 'Cancel',
						onClick: onCancel,
					},
					{
						label: 'Continue',
						onClick: onContinue,
					},
				]}
			/>
		</div>
	);
}

const FieldChangesDialog = Store.compose(FieldChangesDialogInner);

export default function confirm(store = Store.getStore()) {
	const getSchemaChanges = store.get(SCHEMA_CHANGES);
	const changed = getSchemaChanges(changesWeCareAbout);

	return Object.keys(changed).length === 0
		? Promise.resolve('no changes')
		: new Promise((resolve, reject) => {
				let modal;

				const dismiss = fn => () => {
					modal.dismiss();
					fn();
				};

				modal = Prompt.modal(
					<FieldChangesDialog
						fieldGroups={changed}
						onContinue={dismiss(resolve)}
						onCancel={dismiss(reject)}
					/>,
					{ className: styles.dialog }
				);
		  });
}
