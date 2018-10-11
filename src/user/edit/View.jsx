import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Prompt} from '@nti/web-routing';

import {slugify} from '../../util';
import {Card} from '../../common';

import ErrorContext from './ErrorContext';
import {FieldConfig} from './config';
import Frame from './Frame';
import {
	Store,
	LOADED,
	FORM_ID,
	HAS_UNSAVED_CHANGES,
	GET_GROUPS,
	SET_FIELD_ERROR
} from './Store';
import getWidget from './inputs';

const t = scoped('nti-profiles.user.edit.section-titles', {
	about: 'About',
	education: 'Education',
	positions: 'Professional',
});

export default
@Store.connect({
	[LOADED]: 'loaded',
	[FORM_ID]: 'formId',
	[GET_GROUPS]: 'getGroups',
	[SET_FIELD_ERROR]: 'setError',
})
class View extends React.PureComponent {

	static propTypes = {
		loaded: PropTypes.bool,
		formId: PropTypes.string,
		getGroups: PropTypes.func,
		setError: PropTypes.func,
		className: PropTypes.string,
		user: PropTypes.object,
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		this.props.store.load(this.props.user);
	}

	getSection = ([key, fragment]) => {
		const {setError} = this.props;

		const title = t(key, {fallback: key});
		const widgets = Object.values(fragment).map(entry => getWidget(entry));
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
		const {loaded, getGroups, className, user, formId} = this.props;

		if (!loaded) {
			return null;
		}

		const sections = getGroups(FieldConfig.fields);
		const widgets = Object.entries(sections).map(this.getSection);

		return (
			<Frame className={className} user={user}>
				<form id={formId}> {/* Frame takes a single child and renders it along with the sidebar */}
					{widgets}
					<ConfirmExit />
				</form>
			</Frame>
		);
	}
}


@Store.connect({
	[HAS_UNSAVED_CHANGES]: 'hasUnsavedChanges',
})
class ConfirmExit extends React.PureComponent {

	static propTypes = {
		hasUnsavedChanges: PropTypes.bool
	}

	render () {
		const {hasUnsavedChanges = false} = this.props;

		return (
			<Prompt message="You have unsaved changes." when={hasUnsavedChanges} />
		);
	}
}
