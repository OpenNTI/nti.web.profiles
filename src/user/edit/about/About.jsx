import React from 'react';
import PropTypes from 'prop-types';
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
import {Loading} from '@nti/web-commons';

import {LOCALE_PATHS} from '../../constants';
import {Card} from '../../../common';
import FieldLabel from '../FieldLabel';
import {default as Store, LOADING, ERROR, SCHEMA} from '../Store';


const t = scoped(`${LOCALE_PATHS.ABOUT}.edit`, {
	title: 'About',
	editorLabel: 'Write something about yourself.',
});

const KEY = 'about';

export default
@Store.connect({
	[KEY]: 'value',
	[LOADING]: 'loading',
	[ERROR]: 'error',
	[SCHEMA]: 'schema'
})
class EditAbout extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
		user: PropTypes.object,
		value: PropTypes.object,
	}

	constructor (props) {
		super(props);
		this.editorID = generateID();
	}

	onContentChange = (value) => {
		const {store} = this.props;
		store.set(KEY, value);
	}

	render () {
		const {
			loading,
			error,
			user: {about} = {},
			value = Parsers.HTML.toDraftState(about)
		} = this.props;

		const plugins = [
			Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])}),
			Plugins.LimitBlockTypes.create({allow: new Set()}),
		];

		return (
			<Card className="about editing" title={t('title')}>
				<FieldLabel>{t('editorLabel')}</FieldLabel>
				{
					error ? (
						<div>Error</div>
					) : loading ? (
						<Loading.Spinner />
					) : (
						<>
							<Editor className="editor" id={this.editorID} onContentChange={this.onContentChange} editorState={value} plugins={plugins} />
							<ContextProvider editorID={this.editorID}>
								<div className="nti-profile-edit-toolbar">
									<BoldButton />
									<ItalicButton />
									<UnderlineButton />
								</div>
							</ContextProvider>
						</>
					)
				}
			</Card>
		);
	}
}
