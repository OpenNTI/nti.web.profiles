import React from 'react';
import PropTypes from 'prop-types';
import { AssetEditor } from '@nti/web-whiteboard';

import { Avatar, Background } from '../common';

const DefaultAssets = {
	avatarURL: Avatar.Default,
	backgroundURL: Background.Default,
};

const Config = {
	avatarURL: {
		imageEditor: { crop: { aspectRatio: Avatar.aspectRatio } },
		solidEditor: { aspectRatio: Avatar.aspectRatio },
		gradientEditor: { aspectRatio: Avatar.aspectRatio },
	},
	backgroundURL: {
		imageEditor: {
			crop: { aspectRatio: 3 / 2 },
			blur: { radius: 50, minBlur: 0, maxBlur: 50 },
			darken: { color: '#000', opacity: 0.3 },
		},
		solidEditor: { aspectRatio: 3 / 2 },
		gradientEditor: { aspectRatio: 3 / 2 },
	},
};

CommunityAssetEditor.syncAssets = community =>
	community.save({ backgroundURL: null });
CommunityAssetEditor.propTypes = {
	community: PropTypes.shape({
		avatarURL: PropTypes.string,
		backgroundURL: PropTypes.string,
		putToLink: PropTypes.func,
		refresh: PropTypes.func,
	}),
	assetName: PropTypes.oneOf(['avatarURL', 'backgroundURL']),
	afterSave: PropTypes.func,
	onCancel: PropTypes.func,
};
export default function CommunityAssetEditor({
	community,
	assetName,
	afterSave,
	onCancel,
}) {
	const asset = community[assetName] || DefaultAssets[assetName];
	const config = Config[assetName];

	const onSave = async file => {
		const reader = new FileReader();

		const dataURL = await new Promise((fulfill, reject) => {
			reader.onerror = reject;
			reader.onload = () => fulfill(reader.result);

			reader.readAsDataURL(file);
		});

		const data = {
			[assetName]: dataURL,
		};

		const resp = await community.putToLink('edit', data);
		await community.refresh(resp);

		afterSave();
	};

	return (
		<AssetEditor asset={asset} onSave={onSave} onCancel={onCancel}>
			<AssetEditor.Image format={config.imageEditor} />
			<AssetEditor.SolidColor format={config.solidEditor} />
			<AssetEditor.LinearGradient format={config.gradientEditor} />
		</AssetEditor>
	);
}
