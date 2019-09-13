import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Button, Text, Prompt} from '@nti/web-commons';

import {Avatar} from '../../../common';
import AssetEditor from '../../../asset-editor';

import Styles from './View.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.community.Avatar', {
	change: 'Change'
});

export default class AvatarInput extends React.Component {
	static propTypes = {
		community: PropTypes.object.isRequired
	}

	state = {}

	openEditAvatar = () => {
		this.setState({
			editAvatar: true
		});
	}

	render () {
		const {community} = this.props;
		const {editAvatar} = this.state;

		if (!Avatar.hasAvatar(community)) { return null; }

		return (
			<div className={cx('avatar-input')}>
				<Avatar community={community} />
				<Button className={cx('edit-avatar')} onClick={this.openEditAvatar}>
					<i className={cx('icon-image')} />
					<Text.Base className={cx('change')}>{t('change')}</Text.Base>
				</Button>
				{editAvatar && (
					<Prompt.Dialog onBeforeDismiss={this.closeEditAvatar}>
						<AssetEditor
							community={community}
							assetName="avatarURL"
							afterSave={this.closeEditAvatar}
							onCancel={this.closeEditAvatar}
						/>
					</Prompt.Dialog>
				)}
			</div>
		);
	}
}