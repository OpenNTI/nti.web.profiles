import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

import {Avatar, Background} from '../common';

import Types from './types/Data';

const DefaultAssets = {
	avatarURL: Avatar.Default,
	backgroundURL: Background.Default
};

export default class AssetEditorStore extends Stores.BoundStore {
	async load () {
		if (this.community === this.binding.community && this.assetName === this.binding.assetName) { return; }
		
		const community = this.community = this.binding.community;
		const assetName = this.assetName = this.binding.assetName;

		this.set({
			loading: true,
			imageAsset: null,
			solidAsset: null,
			gradientAsset: null
		});

		try {
			const service = await getService();
			const url = community[assetName] || DefaultAssets[assetName];
			const raw = await service.get(url);

			for (let Type of Types) {
				const state = Type.getAssetState && Type.getAssetState(url, raw);

				if (state) {
					this.set({
						loading: false,
						current: Type.Name,
						values: {
							[Type.Name]: state
						}
					});
					return;
				}
			}

			throw new Error('Unknown Asset Type');
		} catch (e) {
			this.set({
				loading: false,
				error: e
			});
		}
	}

	setCurrent (current) {
		this.set({current});
	}

	setValue (type, value) {
		const values = this.get('values');

		this.setImmediate({values: {...values, [type]: value}});
	}
}