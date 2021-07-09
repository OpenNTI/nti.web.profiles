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

UploadView.PropType = {
	onSave: PropTypes.func.isRequired,
};

export default function UploadView({ onSave, onCancel }) {
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
		{ key: 0, label: <Translate localeKey="cancel" />, onClick: onCancel },
	];

	return (
		<>
			<ImageEditor.Editor onChange={onImageChange} />
			<DialogButtons buttons={buttons} />
		</>
	);
}
