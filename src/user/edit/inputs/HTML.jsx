import React from 'react';
import PropTypes from 'prop-types';
import {
	BoldButton,
	ItalicButton,
	UnderlineButton,
	ContextProvider,
	generateID,
	Parsers,
	Plugins,
	STYLES,
} from '@nti/web-editor';

import {ensureArray as arr} from '../../../util';

import FieldContainer from './FieldContainer';
import Editor from './Editor';

const plugins = [
	Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])}),
	Plugins.LimitBlockTypes.create({allow: new Set()}),
];

const isEmptyState = draftState => !draftState || !draftState.getCurrentContent().getPlainText().trim();

export default class HTMLInput extends React.Component {

	static propTypes = {
		label: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.object,
		value: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]),
	}

	constructor (props) {
		super(props);
		this.editorID = generateID();
	}

	onContentChange = (value) => {
		const {onChange, value: propValue} = this.props;

		// the underlying editor fires content change events during initialization and we only care
		// about actual content changes, so until we've detected the first real content change we'll
		// parse and compare values
		if (!this.hasChanged) {
			const newValue = arr(Parsers.HTML.fromDraftState(value));
			const oldValue = arr(Parsers.HTML.fromDraftState(Parsers.HTML.toDraftState(propValue)));

			if (newValue.length === oldValue.length && newValue.every((v, i) => v === oldValue[i])) {
				return;
			}

			this.hasChanged = true;
		}

		// user.save will JSON.stringify() this value... and we want the html, not the EditorState
		value.toJSON = () => isEmptyState(value) ? null : Parsers.HTML.fromDraftState(value);
		onChange(value);
	}

	render () {
		const {
			label,
			value,
			schema: {readonly} = {}
		} = this.props;

		const editorState = Parsers.HTML.toDraftState(value);

		return (
			<FieldContainer className="nti-profile-html-input" label={label}>
				<div>
					<Editor className="editor" id={this.editorID} onContentChange={this.onContentChange} editorState={editorState} plugins={plugins} readOnly={readonly} />
					<ContextProvider editorID={this.editorID}>
						<div className="nti-profile-edit-toolbar">
							<BoldButton />
							<ItalicButton />
							<UnderlineButton />
						</div>
					</ContextProvider>
				</div>
			</FieldContainer>
		);
	}
}
