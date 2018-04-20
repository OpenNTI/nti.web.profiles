import React from 'react';
import PropTypes from 'prop-types';
import {Loading, DialogButtons} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Fields from './fields';
import Store from './Store';

const t = scoped('nti-web-profile.ProfileUpdate.View', {
	title: 'Tell us About Yourself',
	error: 'Unable to load profile.',
	save: 'Save'
});

export default
@Store.connect({
	loading: 'loading',
	fields: 'fields',
	error: 'error',
	onFieldChange: 'onFieldChange',
	values: 'values',
	isValid: 'isValid'
})
class ProfileUpdate extends React.Component {
	static profileNeedsUpdate (entity) {
		return entity.hasLink('user-profile-update');
	}

	static propTypes = {
		entity: PropTypes.object,

		onDismiss: PropTypes.func,

		store: PropTypes.object,
		loading: PropTypes.bool,
		error: PropTypes.object,
		isValid: PropTypes.bool,
		fields: PropTypes.array,
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


	onSave = () => {

	}


	render () {
		const {entity, loading, fields, values, isValid} = this.props;

		return (
			<div className="nti-profile-update">
				<div className="header">
					{t('title')}
				</div>
				<div className="contents">
					{loading && (<Loading.Mask />)}
					{!loading && (<Fields fields={fields} values={values} onChange={this.onFieldChange} entity={entity} />)}
				</div>
				<DialogButtons
					buttons={[
						{
							label: t('save'),
							onClick: this.onSave,
							className: isValid ? null : 'disabled'
						}
					]}
				/>
			</div>
		);
	}
}
