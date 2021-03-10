import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { decorate } from '@nti/lib-commons';

import { slugify } from '../../util';
import { Card } from '../../common';

import ErrorContext from './ErrorContext';
import { Store, FIELD_GROUPS, FORM_ID, SET_FIELD_ERROR } from './Store';
import getWidget from './inputs';

const t = scoped('nti-profiles.user.edit.section-titles', {
	about: 'About',
	education: 'Education',
	positions: 'Professional',
	community: 'Community',
	information: 'Information',
});

class Form extends React.Component {
	static propTypes = {
		fieldGroups: PropTypes.object.isRequired,
		formId: PropTypes.string,
		setError: PropTypes.func,
	};

	getSection = ([key, fragment]) => {
		const { setError } = this.props;

		const title = t(key, { fallback: key });
		const inputs = Object.values(fragment);
		// const widgets = Object.values(fragment).map(entry => getWidget(entry));
		const errorContext = {
			onError: e => setError(e, key),
		};

		return (
			<ErrorContext.Provider key={key} value={errorContext}>
				<Card className={slugify(key)} title={title}>
					{inputs.map(input => {
						const Cmp = getWidget(input);

						if (!Cmp) {
							return null;
						}

						return <Cmp key={input.name} input={input} />;
					})}
				</Card>
			</ErrorContext.Provider>
		);
	};

	render() {
		const { fieldGroups, formId } = this.props;
		const widgets = Object.entries(fieldGroups || {}).map(this.getSection);

		return <form id={formId}>{widgets}</form>;
	}
}

export default decorate(Form, [
	Store.connect({
		[FIELD_GROUPS]: 'fieldGroups',
		[FORM_ID]: 'formId',
		[SET_FIELD_ERROR]: 'setError',
	}),
]);
