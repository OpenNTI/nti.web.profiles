import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {Card} from '../../../common';
import {LOCALE_PATHS} from '../../constants';

import {default as Store, LOADING, SUGGESTIONS} from './Store';

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

		return (suggestions || {}).length === 0 ? null : (
			<Card className="suggested-contacts" title={t('title')} />
		);
	}
}
