import PropTypes from 'prop-types';
import { useReducer } from 'react';

import { StandardUI, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { ImageEditor } from '@nti/web-whiteboard';

import Store from '../../../Store';

import VIEWS from '.';

const translation = scoped('nti.web.profiles.user.account-management.tabs.picture.views.edit', {
	save: 'Save',
	rotate: 'Rotate',
	processing: 'Processing',
});

const Translate = Text.Translator(translation);

const ImageContainer = styled.div`
	margin: 20px;
`;

const initialState = {
	inputKey: 1,
	error: null,
	filename: null,
	editorState: null,
	saving: false,
};

const Mask = styled(Text.Base)`
	color: var(--primary-grey);
`;

const reducer = (state, action) => {
	switch (action.type) {
		case 'error':
			return {
				...state,
				error: action.error,
				saving: false,
			};
		case 'addFile':
			return {
				...state,
				error: null,
				filename: action.filename,
				editorState: action.editorState,
				inputKey: (state.inputKey ?? 0) + 1,
				saving: false,
			};

		case 'updateEditorState':
			return {
				...state,
				editorState: action.editorState,
				saving: false,
			};
		case 'clear':
			return {
				...state,
				filename: null,
				editorState: null,
				saving: false,
			};
		case 'saving':
			return {
				...state,
				saving: true,
			};
		default:
			return state;
	}
}

EditView.PropType = {
	changeView: PropTypes.func,
};

export default function EditView ( { changeView, ...otherProps } ) {
	const { setPicture } = Store.useValue();

	initialState.filename = otherProps?.filename;

	const [
		{ editorState, filename, saving },
		dispatch,
	] = useReducer(reducer, initialState);

	const setEditorState = newEditorState => {
		dispatch({ type: 'updateEditorState', editorState: newEditorState });
	};

	const handleSavePicture = async () => {
		dispatch({type: 'saving'});

		try {
			const size = { maxHeight: 210 };
			const file = await ImageEditor.getBlobForEditorState(
				editorState,
				size
			);

			file.name = filename;

			const source = await ImageEditor.getImgSrc(file);

			setPicture({ file, source, filename });

			changeView(VIEWS.MAIN);
		} catch (e) {
			dispatch({type: 'error', error: e});
		}
	};

	const handleCancel = () => {
		changeView(VIEWS.MAIN);
	};

	return (
		<>
			<StandardUI.Prompt.Base
				actionType="constructive"
				actionLabel={<Translate localeKey="save"/>}
				onAction={handleSavePicture}
				onCancel={handleCancel}
				mask={saving ? <Mask>{<Translate localeKey="processing"/>}</Mask> : null}
			>
				<ImageContainer>
					<ImageEditor.Editor
						editorState={editorState}
						onChange={setEditorState}
					/>
				</ImageContainer>
			</StandardUI.Prompt.Base>
		</>
	);
}
