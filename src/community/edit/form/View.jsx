import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DialogButtons, Text, Loading} from '@nti/web-commons';

import Store from '../Store';

import Styles from './Style.css';
import Assets from './assets';
import Community from './community';
import ChannelList from './channel-list';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.View', {
	save: 'Save',
	cancel: 'Cancel',
	saving: 'Saving...',
	deleting: 'Deleting...'
});

export default
@Store.monitor(['save', 'deleting', 'cancel', 'channelList', 'saving'])
class CommunityEditForm extends React.Component {
	static propTypes = {
		saving: PropTypes.bool,
		deleting: PropTypes.bool,
		save: PropTypes.func,
		cancel: PropTypes.func,
		channelList: PropTypes.array
	}

	save = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const {save} = this.props;

		if (save) {
			save();
		}
	}

	render () {
		const {cancel, channelList, saving, deleting, ...otherProps} = this.props;
		const buttons = [
			{label: t('cancel'), type: 'button', onClick: cancel, disabled: saving},
			{label: t('save'), type: 'submit', disabled: saving}
		];

		const doMask = saving || deleting;

		delete otherProps.save;


		return (
			<form className={cx('community-edit-form')} onSubmit={this.save}>
				<Assets {...otherProps} />
				<div className={cx('form-body')}>
					<Community {...otherProps} />
					<div className={cx('channel-lists')}>
						{(channelList || []).map((list) => {
							return (
								<ChannelList key={list.getID()} channelList={list} only={channelList.length === 1} />
							);
						})}
					</div>
				</div>
				{doMask && (
					<div className={cx('saving-mask')}>
						<Text.Base className={cx('message')}>{deleting ? t('deleting') : t('saving')}</Text.Base>
						<Loading.Spinner />
					</div>
				)}
				<DialogButtons buttons={buttons} />
			</form>
		);
	}
}