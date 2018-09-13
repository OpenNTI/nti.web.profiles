import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {LOCALE_PATHS} from '../../constants';
import {Card} from '../../../common';
import Store from '../Store';

const t = scoped(`${LOCALE_PATHS.PROFESSIONAL}.edit`, {
	title: 'Professional'
});

const KEY = 'user-profile:professional';

export default
@Store.connect({
	[KEY]: 'value'
})
class EditAbout extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired,
		value: PropTypes.object,
	}

	onChange = (value) => {
		const {store} = this.props;
		store.set(KEY, value);
	}

	render () {
		return (
			<Card className="professional" title={t('title')} />
		);
	}
}
