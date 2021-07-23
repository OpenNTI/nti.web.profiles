/* eslint-env jest */
import { setupTestClient } from '@nti/web-client/test-utils';

import Store from '../Store';

jest.mock('@nti/web-whiteboard', () => ({
	ImageEditor: {
		getImg: () => 'mock-image',
	},
}));

const getMockService = () => {
	return {
		getAppUser: async () => {
			return { avatarURL: 'avatar-url' };
		},
	};
};

test('load', async () => {
	setupTestClient(getMockService());

	const store = new Store();

	await store.load();

	expect(store.get('user').avatarURL).toBe('avatar-url');
	expect(store.get('image')).toBe('mock-image');
	expect(store.get('initLoading')).toBe(false);
});

test('save image', async () => {
	const store = new Store();

	const refresh = jest.fn();
	const save = jest.fn();

	store.set('user', {
		refresh: refresh,
		save: obj => save(obj),
	});

	const image = { src: 'image-src' };

	await store.saveImage(image);

	expect(refresh).toBeCalled();
	expect(save).toBeCalledWith({ avatarURL: image.src });
	expect(store.get('image')).toBe(image);
	expect(store.get('loading')).toBe(false);
});
