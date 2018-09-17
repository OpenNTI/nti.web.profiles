import React from 'react';
import PropTypes from 'prop-types';
import {
	BoldButton,
	ItalicButton,
	UnderlineButton,
	ContextProvider,
	Editor,
	generateID,
	Plugins,
	STYLES,
} from '@nti/web-editor';

export default class HTMLInput extends React.Component {

	static propTypes = {
		value: PropTypes.object,
	}

	constructor (props) {
		super(props);
		this.editorID = generateID();
	}

	onContentChange = (value) => {

	}

	render () {
		const {
			value
		} = this.props;

		const plugins = [
			Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])}),
			Plugins.LimitBlockTypes.create({allow: new Set()}),
		];

		return (
			<div className="nti-profile-hmtl-input">
				<Editor className="editor" id={this.editorID} onContentChange={this.onContentChange} editorState={value} plugins={plugins} />
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
