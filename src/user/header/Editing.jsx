import React from 'react';
import PropTypes from 'prop-types';

import { LinkTo } from '@nti/web-routing';
import { Button } from '@nti/web-commons';
import { decorate } from '@nti/lib-commons';

import { Store, Constants, confirmSchemaChanges } from '../edit/';

import { t } from './EditControls';

class Editing extends React.Component {
	static propTypes = {
		clearErrors: PropTypes.func.isRequired,
		formId: PropTypes.string,
		saveProfile: PropTypes.func.isRequired,
		unsaved: PropTypes.bool,
		entity: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object,
	};

	componentDidMount() {
		this.props.store.load(this.props.entity);
	}

	componentWillUnmount() {
		this.props.clearErrors();
	}

	onSave = async e => {
		const {
			props: { clearErrors, saveProfile, store, entity },
			context: { router },
		} = this;
		const { target } = e;
		const formId = target.getAttribute('form');
		const form = document.querySelector(`form#${formId}`);

		clearErrors();

		if (!form || form.checkValidity()) {
			try {
				await confirmSchemaChanges(store);
				await saveProfile();
				router.routeTo.object(entity, 'about');
			} catch (err) {
				//
			}
		}
	};

	render() {
		const { formId, entity, unsaved } = this.props;

		return (
			<div className="editing">
				<LinkTo.Object
					className="cancel"
					object={entity}
					context="about"
				>
					<Button as="span" secondary>
						{t('cancel')}
					</Button>
				</LinkTo.Object>
				<Button
					form={formId}
					className="save"
					disabled={!unsaved}
					onClick={this.onSave}
				>
					{t('save')}
				</Button>
			</div>
		);
	}
}
export default decorate(Editing, [
	Store.connect({
		[Constants.CLEAR_ERRORS]: 'clearErrors',
		[Constants.FORM_ID]: 'formId',
		[Constants.HAS_UNSAVED_CHANGES]: 'unsaved',
		[Constants.SAVE_PROFILE]: 'saveProfile',
	}),
]);
