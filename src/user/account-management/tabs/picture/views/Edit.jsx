import { useState } from 'react';

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
	padding: 10px 20px 0 20px;
	background-color: var(--quad-grey);
`;

const StyledDialogButtons = styled(DialogButtons)`
	width: 100%;
`;

export function Edit({ onSave, image, onCancel }) {
	const [croppedState, setCroppedState] = useState();
	const [editorState] = useState(
		ImageEditor.getEditorState(image, {
			crop: { aspectRatio: 1 },
		})
	);

	const handleSave = async () => {
		try {
			const img = await ImageEditor.getImageForEditorState(
				croppedState,
				400
			);

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
			'data-testid': 'edit-cancel-btn',
		},
		{
			label: t('save'),
			onClick: handleSave,
			'data-testid': 'edit-save-btn',
		},
	];

	return (
		<>
			<Container data-testid="edit-view">
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
