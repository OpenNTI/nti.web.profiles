import React, { useState } from 'react';

import { DialogButtons } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { ImageEditor } from '@nti/web-whiteboard';

const t = scoped(
	'nti.web.profiles.user.account-management.tabs.picture.views.edit',
	{
		save: 'Save',
		cancel: 'Cancel',
	}
);

const ImageEditorWrapper = styled(ImageEditor.Editor)`
	padding: 20px 0;
	background-color: var(--tertiary-grey);
`;

export default function EditView({ onSave, image, onCancel }) {
	const [croppedState, setCroppedState] = useState();
	const [editorState] = useState(
		ImageEditor.getEditorState(image, {
			crop: { aspectRatio: 1 },
		})
	);

	const handleSave = async () => {
		try {
			const img = await ImageEditor.getImageForEditorState(croppedState);

			if (img && onSave) {
				onSave(img);
			}
		} catch (e) {
			//Handle error
		}
	};

	const handleChange = editorState => {
		setCroppedState(editorState);
	};

	const buttons = [
		{
			label: t('cancel'),
			onClick: onCancel,
		},
		{
			label: t('save'),
			onClick: handleSave,
		},
	];

	return (
		<>
			<ImageEditorWrapper
				editorState={editorState}
				onChange={handleChange}
			/>
			<DialogButtons buttons={buttons} />
		</>
	);
}
