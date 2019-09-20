import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Prompt, Image, Text} from '@nti/web-commons';

import {Avatar, Background} from '../../../common';
import AssetEditor from '../../../asset-editor';
import {EditAssetButton} from '../../inputs';

import Styles from './View.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.assets.View', {
	syncBackground: 'Set cover image as background.'
});

export default class AssetsInput extends React.Component {
	static propTypes = {
		community: PropTypes.object.isRequired
	}

	state = {}

	openEditAvatar = () => {
		this.setState({
			editAvatar: true
		});
	}

	openEditBackground = () => {
		this.setState({
			editBackground: true
		});
	}

	doSync = (e) => {
		const {community} = this.props;

		this.setState({syncing: true}, async () => {
			try {
				await AssetEditor.syncAssets(community);
			} finally {
				this.setState({
					syncing: false
				});
			}
		});
	}

	closeEditAvatar = () => this.setState({editAvatar: false})
	closeEditBackground = () => this.setState({editBackground: false})

	render () {
		const {community} = this.props;
		const {editAvatar, editBackground, syncing} = this.state;

		if (!Avatar.hasAvatar(community)) { return null; }

		const notSynced = Boolean(community.backgroundURL);

		return (
			<div className={cx('assets-input', {syncing})}>
				<div className={cx('background')}>
					<Image.Container aspectRatio={Avatar.aspectRatio}>
						<Background community={community} />
					</Image.Container>
					<EditAssetButton className={cx('edit-button')} onClick={this.openEditBackground} />
				</div>
				<div className={cx('avatar')}>
					<Avatar community={community} />
					<EditAssetButton className={cx('edit-button')} onClick={this.openEditAvatar} />
				</div>
				{notSynced && (
					<Text.Base as="a" role="button" className={cx('sync')} onClick={this.doSync}>
						{t('syncBackground')}
					</Text.Base>
				)}
				{editAvatar && (
					<Prompt.Dialog onBeforeDismiss={this.closeEditAvatar} closeOnMaskClick={false} >
						<AssetEditor
							community={community}
							assetName="avatarURL"
							afterSave={this.closeEditAvatar}
							onCancel={this.closeEditAvatar}
						/>
					</Prompt.Dialog>
				)}
				{editBackground && (
					<Prompt.Dialog onBeforeDismiss={this.closeEditBackground} closeOnMaskClick={false} >
						<AssetEditor
							community={community}
							assetName="backgroundURL"
							afterSave={this.closeEditBackground}
							onCancel={this.closeEditBackground}
						/>
					</Prompt.Dialog>
				)}
			</div>
		);
	}
}