import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Editor, Plugins} from '@nti/web-editor';

import {LOCALE_PATHS} from '../../../constants';
import {Card} from '../../../../common';
import Store from '../Store';

const t = scoped(`${LOCALE_PATHS.ABOUT}.edit`, {
	title: 'About',
	editLabel: 'Tell us about yourself…',
});

const KEY = 'user-profile:about';

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
		const {value} = this.props;

		const plugins = [
			Plugins.LimitStyles.create({allow: new Set()}),
			Plugins.LimitBlockTypes.create({allow: new Set()}),
		];

		return (
			<Card className="about" title={t('title')}>
				<Editor onChange={this.onChange} value={value} plugins={plugins} />
			</Card>
		);
	}
}
