/* eslint-env jest */
import { render, fireEvent, waitFor } from '@testing-library/react';

import { FakeStore } from '@nti/lib-store';
import { setupTestClient } from '@nti/web-client/test-utils';

import PictureView from '../../tabs/picture';
import Store from '../../Store';
import { Edit } from '../../tabs/picture/views';

jest.mock('@nti/web-whiteboard', () => ({
	ImageEditor: {
		...jest.requireActual('@nti/web-whiteboard').ImageEditor,
		getImg: () => 'mock-image',
		getEditorState: () => {
			return { state: 'editor-state' };
		},
		getImageForEditorState: () => 'image',
	},
}));

const getMockService = () => {
	return {
		getAppUser: async () => {
			return { avatarURL: 'avatar-url' };
		},
	};
};

beforeAll(() => setupTestClient(getMockService()));

test('Navigation', async () => {
	const store = new Store();

	await store.load();

	const component = render(
		<FakeStore mock={store}>
			<PictureView />
		</FakeStore>
	);

	expect(component.queryByTestId('main-view')).toBeTruthy();

	// Main to Edit to Main
	await waitFor(() => fireEvent.click(component.queryByTestId('edit-link')));
	expect(component.queryByTestId('edit-view')).toBeTruthy();

	await waitFor(() => fireEvent.click(component.queryByTestId('cancel-btn')));
	expect(component.queryByTestId('main-view')).toBeTruthy();

	// Main to Upload to Main
	await waitFor(() =>
		fireEvent.click(component.queryByTestId('upload-link'))
	);
	expect(component.queryByTestId('upload-view')).toBeTruthy();

	await waitFor(() => fireEvent.click(component.queryByTestId('cancel-btn')));
	expect(component.queryByTestId('main-view')).toBeTruthy();
});

test('Edit save button', async () => {
	const onSave = jest.fn();

	const component = render(<Edit onSave={onSave} />);

	await waitFor(() => fireEvent.click(component.queryByTestId('save-btn')));

	expect(onSave).toBeCalledWith('image');
});
