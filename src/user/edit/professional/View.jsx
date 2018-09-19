import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Connectors} from '@nti/lib-store';

import {LOCALE_PATHS} from '../../constants';
import {Card} from '../../../common';
import {SET_FIELD_VALUE} from '../Store';

const t = scoped(`${LOCALE_PATHS.PROFESSIONAL}.edit`, {
	title: 'Professional'
});

const KEY = 'user-profile:professional';

export default
@Connectors.Any.connect({
	[KEY]: 'value',
	[SET_FIELD_VALUE]: 'setValue'
})
class Professional extends React.Component {

	static propTypes = {
		setValue: PropTypes.func.isRequired,
		value: PropTypes.object,
	}

	onChange = (value) => {
		const {setValue} = this.props;
		setValue(KEY, value);
	}

	render () {
		return (
			<Card className="professional" title={t('title')} />
		);
	}
}
