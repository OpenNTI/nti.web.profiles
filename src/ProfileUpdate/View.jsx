import React from 'react';
import PropTypes from 'prop-types';
import {Loading, DialogButtons} from 'nti-web-commons';
import {scoped} from 'nti-lib-locale';

import Fields from './fields';
import Store from './Store';

const t = scoped('nti-web-profile.ProfileUpdate.View', {
	title: 'Update Profile',
	error: 'Unable to load profile.',
	save: 'Save'
});

export default
@Store.connect({loading: 'loading', fields: 'fields', error: 'error'})
class ProfileUpdate extends React.Component {
	static profileNeedsUpdate (entity) {
		return entity.hasLink('user-profile-update');
	}

	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,

		onDismiss: PropTypes.func,

		loading: PropTypes.bool,
		error: PropTypes.object,
		fields: PropTypes.array
	}


	componentDidMount () {
		const {entity, store} = this.props;

		store.setEntity(entity);
	}


	onSave = () => {

	}


	render () {
		const {loading, fields} = this.props;

		return (
			<div className="nti-profile-update">
				<div className="header">
					{t('title')}
				</div>
				<div className="contents">
					{loading && (<Loading.Mask />)}
					{!loading && (<Fields fields={fields} />)}
				</div>
				<DialogButtons
					buttons={[
						{
							label: t('save'),
							onClick: this.onSave,
							className: 'disabled'
						}
					]}
				/>
			</div>
		);
	}
}
