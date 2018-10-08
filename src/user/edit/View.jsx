import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {slugify} from '../../util';
import {Card} from '../../common';

import ErrorContext from './ErrorContext';
import Frame from './Frame';
import {Store, LOADED, FORM_ID, GET_SCHEMA_ENTRY, SET_FIELD_ERROR} from './Store';
import getWidget from './inputs';

const t = scoped('nti-profiles.user.edit.section-titles', {
	about: 'About',
	education: 'Education',
	positions: 'Professional',
});

const SECTIONS = [
	{
		key: 'about',
		fields: [
			'about',
			'realname',
			'alias',
			'email',
			'location',
			'home_page',
			'facebook',
			'linkedIn',
			'twitter',
			'googlePlus'
		]
	},
	{ key: 'education' },
	{ key: 'positions' },
	{ key: 'interests' },
];

export default
@Store.connect({
	[LOADED]: 'loaded',
	[FORM_ID]: 'formId',
	[GET_SCHEMA_ENTRY]: 'getSchemaEntry',
	[SET_FIELD_ERROR]: 'setError',
})
class View extends React.Component {

	static propTypes = {
		loaded: PropTypes.bool,
		formId: PropTypes.string,
		getSchemaEntry: PropTypes.func,
		setError: PropTypes.func,
		className: PropTypes.string,
		user: PropTypes.object,
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		this.props.store.load(this.props.user);
	}

	getSection = ({key, fields}) => {
		const {getSchemaEntry, setError} = this.props;

		const title = t(key, {fallback: key});
		const widgets = (fields || [key]).map(fieldName => getWidget(getSchemaEntry(fieldName)));
		const errorContext = {
			onError: (e) => setError(e, key)
		};
		return (
			<ErrorContext.Provider key={key} value={errorContext}>
				<Card className={slugify(key)} title={title}>
					{widgets.map((W, i) => <W key={i} />)}
				</Card>
			</ErrorContext.Provider>
		);
	}

	render () {
		const {loaded, className, user, formId} = this.props;

		if (!loaded) {
			return null;
		}

		const widgets = SECTIONS.map(this.getSection);

		return (
			<Frame className={className} user={user}>
				<form id={formId}> {/* Frame takes a single child and renders it along with the sidebar */}
					{widgets}
				</form>
			</Frame>
		);
	}
}
