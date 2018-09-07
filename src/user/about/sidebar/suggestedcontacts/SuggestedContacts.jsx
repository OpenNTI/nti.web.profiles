import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {EntityList} from '../../../../common';
import {LOCALE_PATHS} from '../../../constants';

import {default as Store, LOADING, SUGGESTIONS} from './Store';

const MAX_ITEMS = 4;
const t = scoped(`${LOCALE_PATHS.ROOT}.suggestedContacts`, {
	title: 'You May Know…'
});

export default
@Store.connect({
	[LOADING]: 'loading',
	[SUGGESTIONS]: 'suggestions'
})
class SuggestedContacts extends React.Component {

	static propTypes = {
		loading: PropTypes.bool,
		suggestions: PropTypes.array
	}

	static deriveBindingFromProps = ({user}) => user

	render () {
		const {suggestions} = this.props;
		const chunk = (suggestions || []).slice(0, MAX_ITEMS);

		return !chunk.length ? null : (
			<EntityList className="suggested-contacts" entities={chunk} title={t('title')} />
		);
	}
}
