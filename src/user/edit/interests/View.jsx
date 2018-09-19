import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Connectors} from '@nti/lib-store';

import {LOCALE_PATHS} from '../../constants';
import {Card} from '../../../common';
import {SET_FIELD_VALUE} from '../Store';

const t = scoped(`${LOCALE_PATHS.INTERESTS}.edit`, {
	title: 'Interests'
});

const KEY = 'user-profile:interests';

export default
@Connectors.Any.connect({
	[KEY]: 'value',
	[SET_FIELD_VALUE]: 'setValue'
})
class Interests extends React.Component {

	static propTypes = {
		value: PropTypes.object,
		setValue: PropTypes.func.isRequired
	}

	onChange = (value) => {
		const {setValue} = this.props;
		setValue(KEY, value);
	}

	render () {
		return (
			<Card className="interests" title={t('title')} />
		);
	}
}
