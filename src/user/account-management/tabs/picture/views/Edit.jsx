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

const Container = styled.div`
	padding: 0 20px;
	background-color: var(--quad-grey);
`;

const StyledDialogButtons = styled(DialogButtons)`
	width: 100%;
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
			<Container>
				<ImageEditor.Editor
					allowedControls={[ImageEditor.Editor.Controls.Rotate]}
					editorState={editorState}
					onChange={handleChange}
				/>
			</Container>
			<StyledDialogButtons buttons={buttons} />
		</>
	);
}
