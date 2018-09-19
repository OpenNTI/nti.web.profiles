import React from 'react';
import PropTypes from 'prop-types';
import {Connectors} from '@nti/lib-store';
import {scoped} from '@nti/lib-locale';
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

import {LOCALE_PATHS} from '../../constants';
import {Card, Error} from '../../../common';
import FieldLabel from '../FieldLabel';
import {SET_FIELD_VALUE, ERROR, GET_SCHEMA_ENTRY} from '../Store';


const t = scoped(`${LOCALE_PATHS.ABOUT}.edit`, {
	title: 'About',
	editorLabel: 'Write something about yourself.',
});

const KEY = 'about';

export default
@Connectors.Any.connect({
	[KEY]: 'value',
	[ERROR]: 'error',
	[SET_FIELD_VALUE]: 'setValue',
	[GET_SCHEMA_ENTRY]: 'schema'
})
class About extends React.Component {

	static propTypes = {
		error: PropTypes.object,
		user: PropTypes.object,
		value: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]),
		setValue: PropTypes.func
	}

	constructor (props) {
		super(props);
		this.editorID = generateID();
	}

	onContentChange = (value) => {
		const {setValue} = this.props;
		setValue(KEY, value);
	}

	render () {
		const {
			error,
			value
		} = this.props;

		const plugins = [
			Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])}),
			Plugins.LimitBlockTypes.create({allow: new Set()}),
		];

		const editorState = Parsers.HTML.toDraftState(value);

		return (
			<Card className="about editing" title={t('title')}>
				<FieldLabel>{t('editorLabel')}</FieldLabel>
				{error && <Error error={error} />}
				<Editor className="editor" id={this.editorID} onContentChange={this.onContentChange} editorState={editorState} plugins={plugins} />
				<ContextProvider editorID={this.editorID}>
					<div className="nti-profile-edit-toolbar">
						<BoldButton />
						<ItalicButton />
						<UnderlineButton />
					</div>
				</ContextProvider>
			</Card>
		);
	}
}
