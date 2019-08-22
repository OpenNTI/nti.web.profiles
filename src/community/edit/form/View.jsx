import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DialogButtons} from '@nti/web-commons';

import Store from '../Store';

import Styles from './Style.css';
import Community from './community';
import ChannelList from './channel-list';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.View', {
	save: 'Save',
	cancel: 'Cancel'
});

export default
@Store.monitor(['save', 'cancel', 'channelList'])
class CommunityEditForm extends React.Component {
	static propTypes = {
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
		const {cancel, channelList, ...otherProps} = this.props;
		const buttons = [
			{label: t('cancel'), type: 'button', onClick: cancel},
			{label: t('save'), type: 'submit'}
		];

		delete otherProps.save;


		return (
			<form className={cx('community-edit-form')} onSubmit={this.save}>
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
				<DialogButtons buttons={buttons} />
			</form>
		);
	}
}