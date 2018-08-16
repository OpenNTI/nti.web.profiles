import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import cx from 'classnames';

const t = scoped('profile.about.social', {
	'twitter': 'Twitter',
	'googlePlus': 'Google+',
	'linkedIn': 'LinkedIn',
	'facebook': 'Facebook'
});

const socialPropNames = [
	'twitter',
	'googlePlus',
	'linkedIn',
	'facebook'
];

export default class Social extends React.Component {
	static propTypes = {
		entity: PropTypes.object
	}

	render () {
		let {entity = {}} = this.props;
		let items = socialPropNames.map(prop => {
			return entity[prop]
				? (
					<li key={prop}>
						<a target="_blank" rel="noopener noreferrer" className={cx('social', prop.toLowerCase())} href={entity[prop]}>
							<span>{t(prop)}</span>
						</a>
					</li>
				)
				: null;
		}).filter(x=>x);

		return (
			items.length > 0 && (
				<ul className="social-links">
					{items}
				</ul>
			)
		);
	}
}
