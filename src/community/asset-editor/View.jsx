import PropTypes from 'prop-types';

import { AssetEditor } from '@nti/web-whiteboard';

import { Avatar, Background } from '../common';

const DefaultAssets = {
	avatarURL: Avatar.Default,
	backgroundURL: Background.Default,
};

const Config = {
	avatarURL: {
		imageEditor: {
			format: { crop: { aspectRatio: Avatar.aspectRatio } }
		},
		solidEditor: {
			format: { aspectRatio: Avatar.aspectRatio }
		},
		gradientEditor: {
			format: { aspectRatio: Avatar.aspectRatio }
		},
	},
	backgroundURL: {
		imageEditor: {
			format: {
				crop: { aspectRatio: 3 / 2 },
				blur: { radius: 50, minBlur: 0, maxBlur: 50 },
				darken: { color: '#000', opacity: 0.3 },
			},
			output: {maxHeight: 1000}
		},
		solidEditor: {
			format: { aspectRatio: 3 / 2 }
		},
		gradientEditor: {
			format: { aspectRatio: 3 / 2 }
		},
	},
};

CommunityAssetEditor.syncAssets = community =>
	community.save({ backgroundURL: null });
CommunityAssetEditor.propTypes = {
	community: PropTypes.shape({
		avatarURL: PropTypes.string,
		backgroundURL: PropTypes.string,
		save: PropTypes.func
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

		await community.save(data);

		afterSave();
	};

	return (
		<AssetEditor asset={asset} onSave={onSave} onCancel={onCancel}>
			<AssetEditor.Image format={config.imageEditor.format} output={config.imageEditor.output} />
			<AssetEditor.SolidColor format={config.solidEditor.format} />
			<AssetEditor.LinearGradient format={config.gradientEditor.format} />
		</AssetEditor>
	);
}
