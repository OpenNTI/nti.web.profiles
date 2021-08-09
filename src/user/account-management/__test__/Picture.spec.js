/* eslint-env jest */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Suspense } from 'react';

import { setupTestClient } from '@nti/web-client/test-utils';

import { Picture } from '../tabs/picture/View';
import { Edit } from '../tabs/picture/views/Edit';

jest.mock('../tabs/picture/Hooks', () => ({ useImage: () => 'image' }));

jest.mock('@nti/web-whiteboard', () => ({
	ImageEditor: {
		...jest.requireActual('@nti/web-whiteboard').ImageEditor,
		getEditorState: () => {
			return { state: 'editor-state' };
		},
		getImageForEditorState: () => 'image',
	},
}));

const getMockService = () => {
	return {
		getAppUser: () => ({ avatarURL: 'avatar-url' }),
	};
};

beforeAll(() => setupTestClient(getMockService()));

test('Navigation', async () => {
	const component = render(
		<Suspense fallback={<div>Fallback</div>}>
			<Picture />
		</Suspense>
	);

	await waitFor(() =>
		expect(component.queryByTestId('main-view')).toBeTruthy()
	);

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
