import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import Entry from './Entry';

const t = scoped('nti-web-profile.memberships.communities', {
	title: 'Communities'
});

export default class Communities extends React.Component {

	static handles (mimeType) {
		return /community$/i.test(mimeType);
	}

	static title = t('title')

	static propTypes = {
		items: PropTypes.array
	}

	render () {
		const {items} = this.props;

		return (
			<div className="communities">
				<ul className="entries">
					{items.map(item => (
						<li key={item.getID()}>
							<Entry item={item} />
						</li>
					))}
				</ul>
			</div>
		);
	}
}
