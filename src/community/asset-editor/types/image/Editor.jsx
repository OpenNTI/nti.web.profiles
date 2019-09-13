import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Image, Text} from '@nti/web-commons';

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

export default class CommunityAssetImageEditor extends React.Component {
	static Name = Name;
	static propTypes = {
		value: PropTypes.shape({
			original: PropTypes.string,
			updated: PropTypes.string
		})
	}


	render () {
		const {value} = this.props;
		const {original, updated} = value || {};

		return (
			<div className={cx('community-image-editor')}>
				<Image src={updated || original} className={cx('community-image')} />
				<div className={cx('note')}>
					<Text.Base className={cx('label')}>{t('notice.label')}</Text.Base>
					<Text.Base className={cx('message')}>{t('notice.message')}</Text.Base>
				</div>
			</div>
		);
	}
}