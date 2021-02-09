import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {decorate} from '@nti/lib-commons';
import {Loading, DialogButtons} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import {getCmpForType} from './types';
import Store from './Store';

const t = scoped('nti-web-profile.ProfileUpdate.View', {
	title: 'Tell us About Yourself',
	error: 'Unable to load profile.',
	save: 'Save',
	saving: 'Saving',
	unknownError: 'Unable to update profile.'
});

class ProfileUpdate extends React.Component {
	static profileNeedsUpdate (entity) {
		return entity.hasLink('user_profile_update');
	}

	static propTypes = {
		entity: PropTypes.object,

		onDismiss: PropTypes.func,

		store: PropTypes.object,
		loading: PropTypes.bool,
		saving: PropTypes.bool,
		error: PropTypes.object,
		isValid: PropTypes.bool,
		fields: PropTypes.array,
		type: PropTypes.string,
		baseType: PropTypes.string,
		values: PropTypes.object,
		onFieldChange: PropTypes.func
	}


	componentDidMount () {
		const {entity, store} = this.props;

		store.setEntity(entity);
	}


	onFieldChange = (field, value) => {
		const {onFieldChange} = this.props;

		if (onFieldChange) {
			onFieldChange(field, value);
		}
	}


	onSave = async () => {
		const {store, onDismiss} = this.props;

		try {
			await store.saveValues();

			if (onDismiss) {
				onDismiss();
			}
		} catch (e) {
			//The store is handling the error, so we don't need to do anything
		}
	}


	render () {
		const {entity, loading, saving, error, fields, type, baseType, values, isValid} = this.props;
		const Cmp = getCmpForType(type, baseType);

		return (
			<div className="nti-profile-update">
				<div className="header">
					{t('title')}
				</div>
				<div className="contents">
					{loading && (<Loading.Mask />)}
					{saving && (<Loading.Mask message={t('saving')}/>)}
					{!loading && !saving && error && this.renderError(error)}
					{!loading && !saving && Cmp && (
						<Cmp
							fields={fields}
							values={values}
							onChange={this.onFieldChange}
							entity={entity}
							type={type}
						/>
					)}
				</div>
				<DialogButtons
					buttons={[
						{
							label: t('save'),
							onClick: this.onSave,
							className: isValid && !error ? null : 'disabled'
						}
					]}
				/>
			</div>
		);
	}


	renderError (error) {
		return (
			<div className="error">
				{(error && (error.message || error.Message)) || t('unknownError')}
			</div>
		);
	}
}

export default decorate(ProfileUpdate, [
	Store.connect({
		loading: 'loading',
		saving: 'saving',
		fields: 'fields',
		type: 'type',
		baseType: 'baseType',
		error: 'error',
		onFieldChange: 'onFieldChange',
		values: 'values',
		isValid: 'isValid'
	})
]);
