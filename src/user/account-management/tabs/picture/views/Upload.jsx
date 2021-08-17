import PropTypes from 'prop-types';

import { DialogButtons, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { ImageEditor } from '@nti/web-whiteboard';

const t = scoped(
	'nti.web.profiles.user.account-management.tabs.picture.views.upload',
	{
		cancel: 'Cancel',
	}
);

const Translate = Text.Translator(t);

const ImageEditorWrapper = styled.div`
	padding: 20px;
`;

Upload.PropType = {
	onSave: PropTypes.func.isRequired,
};

export function Upload({ onSave, onCancel }) {
	const onImageChange = async editorState => {
		try {
			const img = await ImageEditor.getImageForEditorState(editorState);

			if (img && onSave) {
				onSave(img);
			}
		} catch (e) {
			//handle error
		}
	};
	const buttons = [
		{
			key: 0,
			label: <Translate localeKey="cancel" />,
			onClick: onCancel,
			'data-testid': 'upload-cancel-btn',
		},
	];

	return (
		<div data-testid="upload-view">
			<ImageEditorWrapper>
				<ImageEditor.Editor onChange={onImageChange} />
			</ImageEditorWrapper>
			<DialogButtons buttons={buttons} />
		</div>
	);
}
