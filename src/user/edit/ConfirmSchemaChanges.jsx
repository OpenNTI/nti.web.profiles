import React from 'react';
import PropTypes from 'prop-types';
import {DialogButtons, Prompt} from '@nti/web-commons';

import {FieldConfig} from './config';
import {addGroupsToSchema} from './util';
import Form from './Form';
import {Store, FIELD_GROUPS, GROUP_SCHEMA_FIELDS} from './Store';

const mockChanges = {
	about: {
		location: {
			description: 'This is just for testing.'
		}
	}
};

export default function confirm (schemaChanges) {
	return Object.keys(schemaChanges).length === 0
		? Promise.resolve('no changes')
		: new Promise((resolve, reject) => {
			let modal;

			const dismiss = fn => () => {
				modal.dismiss();
				fn();
			};

			modal = Prompt.modal(<FieldChangesDialog schemaChanges={schemaChanges} onContinue={dismiss(resolve)} onCancel={dismiss(reject)} />);
		});
}

@Store.connect({
	[FIELD_GROUPS]: 'fieldGroups',
	[GROUP_SCHEMA_FIELDS]: 'groupFields'
})
class FieldChangesDialog extends React.Component {

	static propTypes = {
		fieldGroups: PropTypes.object.isRequired,
		groupFields: PropTypes.func.isRequired,
		schemaChanges: PropTypes.object.isRequired,
		onContinue: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired
	}

	getFieldGroups () {
		const {fieldGroups, schemaChanges, groupFields} = this.props;
		const grouped = groupFields(addGroupsToSchema(schemaChanges, FieldConfig.fieldGroups));

		return Object.keys(grouped).reduce((acc, key) => {
			acc[key] = fieldGroups[key];
			return acc;
		}, {});
	}

	render () {
		const {onContinue, onCancel} = this.props;

		return (
			<div>
				<Form formId="schema-change-confirmation" fieldGroups={this.getFieldGroups()}/>
				<DialogButtons
					buttons={[
						{
							label: 'Cancel',
							onClick: onCancel,
						},
						{
							label: 'Continue',
							onClick: onContinue,
						}
					]}
				/>
			</div>
		);
	}
}
