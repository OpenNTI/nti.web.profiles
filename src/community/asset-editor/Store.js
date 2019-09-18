import {Stores} from '@nti/lib-store';
import {getService} from '@nti/web-client';

import {Avatar, Background} from '../common';

import Types from './types/Data';

const DefaultAssets = {
	avatarURL: Avatar.Default,
	backgroundURL: Background.Default
};

export default class AssetEditorStore extends Stores.BoundStore {
	static syncAssets (community) {
		return community.save({backgroundURL: null});
	}

	async load () {
		if (this.community === this.binding.community && this.assetName === this.binding.assetName) { return; }
		
		const community = this.community = this.binding.community;
		const assetName = this.assetName = this.binding.assetName;

		this.set({
			loading: true,
			error: null,
			assetName: assetName,
			commmunity: community,
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
		this.set({current, error: null});
	}

	setValue (type, value) {
		const values = this.get('values');
		const prev = values[type];

		this.setImmediate({
			error: null,
			values: {
				...values,
				[type]: {
					...prev,
					updated: value
				}
			}
		});
	}


	cancel () {
		if (this.binding.onCancel) {
			this.binding.onCancel();
		}
	}


	async save () {
		const current = this.get('current');
		const values = this.get('values');

		const toSave = values[current];

		if (!toSave) { return; }

		try {
			for (let Type of Types) {
				if (Type.Name === current && Type.saveTo) {
					this.set({saving: true});

					await Type.saveTo(values[current], this.community, this.assetName);

					if (this.binding.afterSave) {
						this.binding.afterSave();
					}

					this.set({saving: false});
				}
			}

			throw new Error('Unknown Asset Type');
		} catch (e) {
			this.set({
				saving: false,
				error: e
			});
		}
	}
}