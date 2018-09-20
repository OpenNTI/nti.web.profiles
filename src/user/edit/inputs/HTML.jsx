import React from 'react';
import PropTypes from 'prop-types';
import {
	BoldButton,
	ItalicButton,
	UnderlineButton,
	ContextProvider,
	Editor,
	generateID,
	Parsers,
	Plugins,
	STYLES,
} from '@nti/web-editor';

import FieldLabel from '../FieldLabel';

export default class HTMLInput extends React.Component {

	static propTypes = {
		label: PropTypes.string,
		setValue: PropTypes.func,
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
		const {setValue} = this.props;
		// user.save will invoke toJSON on this and we want the html, not the EditorState
		value.toJSON = () => Parsers.HTML.fromDraftState(value);
		setValue(value);
	}

	render () {
		const {
			label,
			value
		} = this.props;

		const plugins = [
			Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])}),
			Plugins.LimitBlockTypes.create({allow: new Set()}),
		];

		const editorState = Parsers.HTML.toDraftState(value);

		return (
			<div className="nti-profile-html-input">
				{label && <FieldLabel>{label}</FieldLabel>}
				<Editor className="editor" id={this.editorID} onContentChange={this.onContentChange} editorState={editorState} plugins={plugins} />
				<ContextProvider editorID={this.editorID}>
					<div className="nti-profile-edit-toolbar">
						<BoldButton />
						<ItalicButton />
						<UnderlineButton />
					</div>
				</ContextProvider>
			</div>
		);
	}
}
