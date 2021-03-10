import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { DialogButtons } from '@nti/web-commons';

import Store from '../Store';

import Styles from './Form.css';
import DisplayName from './DisplayName';
import AutoSubscribe from './AutoSubscribe';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.creation.form.Form', {
	save: 'Create',
	cancel: 'Cancel',
});

class CommunityCreationForm extends React.Component {
	static propTypes = {
		saving: PropTypes.bool,
		save: PropTypes.func,
		cancel: PropTypes.func,
		error: PropTypes.object,
	};

	save = e => {
		e.preventDefault();
		e.stopPropagation();

		const { save } = this.props;

		if (save) {
			save();
		}
	};

	render() {
		const { cancel, saving } = this.props;
		const buttons = [
			{
				label: t('cancel'),
				type: 'button',
				onClick: cancel,
				disbaled: saving,
			},
			{ label: t('save'), type: 'submit', disbaled: saving },
		];

		return (
			<form
				className={cx('community-creation-form')}
				onSubmit={this.save}
			>
				<div className={cx('form-body')}>
					<DisplayName />
					<AutoSubscribe />
				</div>
				<DialogButtons buttons={buttons} />
			</form>
		);
	}
}

export default decorate(CommunityCreationForm, [
	Store.monitor(['save', 'cancel', 'saving', 'error']),
]);
