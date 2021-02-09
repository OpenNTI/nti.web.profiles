import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {Prompt} from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.forum.channel.Delete', {
	confirm: {
		title: 'Are you sure?',
		message: 'Deleting a channel will also delete all of its posts. Do you want to continue?'
	}
});

class DeleteChannel extends React.Component {
	static propTypes = {
		delete: PropTypes.func,
		canDelete: PropTypes.bool,
		doNotPromptOnDelete: PropTypes.bool
	}

	doDelete = async () => {
		const {delete: doDelete, doNotPromptOnDelete} = this.props;

		if (!doDelete) { return; }

		if (doNotPromptOnDelete) { return doDelete(); }

		try {
			await Prompt.areYouSure(t('confirm.message'), t('confirm.title'));
			doDelete();
		} catch (e) {
			//They canceled so we don't need to do anything
		}
	}

	render () {
		const {canDelete} = this.props;

		return (
			<button type="button" className={cx('delete', {disabled: !canDelete})} onClick={canDelete ? this.doDelete : null}>
				<i className="icon-remove" />
			</button>
		);
	}
}


export default decorate(DeleteChannel, [
	Store.monitor(['delete', 'canDelete', 'doNotPromptOnDelete'])
]);
