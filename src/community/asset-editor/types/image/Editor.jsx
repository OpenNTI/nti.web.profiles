import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Image, Text, Button} from '@nti/web-commons';
import {ImageEditor} from '@nti/web-whiteboard';

import {Avatar} from '../../../common';

import {Name} from './Constants';
import Styles from './Editor.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.asset-editor.types.image.Editor', {
	change: 'Change',
	notice: {
		label: 'Note',
		message: 'Background images will be blurred and darkened to improve contrast between posts and the background.'
	}
});

const Formats = {
	'avatarURL': {crop: {aspectRatio: Avatar.aspectRatio}},
	'backgroundURL': {crop: {aspectRatio: 3 / 2}, blur: {radius: 50}}
};

export default class CommunityAssetImageEditor extends React.Component {
	static Name = Name;
	static propTypes = {
		assetName: PropTypes.string,
		value: PropTypes.shape({
			original: PropTypes.string,
			updated: PropTypes.string
		}),
		onChange: PropTypes.func
	}

	startUpdate = () => {
		const {assetName} = this.props;

		this.onUpdate(ImageEditor.getEditorState(null, Formats[assetName]));
	}

	onUpdate = (editorState) => {
		const {onChange} = this.props;

		if (onChange) {
			onChange(editorState);
		}
	}


	render () {
		const {value} = this.props;
		const {original, updated} = value || {};

		return (
			<div className={cx('community-image-editor')}>
				{!updated && (
					<Image.Container aspectRatio={Avatar.aspectRatio} className={cx('community-image')}>
						<Image src={original} className={cx('community-image')} />
					</Image.Container>
				)}
				{!updated && (
					<Button className={cx('change-asset')} onClick={this.startUpdate}>
						<i className={cx('icon-image')} />
						<Text.Base className={cx('change')}>{t('change')}</Text.Base>
					</Button>
				)}
				{updated && (
					<div className={cx('image-editor-wrapper')}>
						<ImageEditor.Editor editorState={updated} onChange={this.onUpdate} />
					</div>
				)}
				<div className={cx('note')}>
					<Text.Base className={cx('label')}>{t('notice.label')}</Text.Base>
					<Text.Base className={cx('message')}>{t('notice.message')}</Text.Base>
				</div>
			</div>
		);
	}
}