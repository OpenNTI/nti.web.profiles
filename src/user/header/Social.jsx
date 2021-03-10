import './Social.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { scoped } from '@nti/lib-locale';

const t = scoped('profile.about.social', {
	facebook: 'Facebook',
	linkedIn: 'LinkedIn',
	twitter: 'Twitter',
	googlePlus: 'Google+',
	instagram: 'Instagram',
});

const socialPropNames = [
	'facebook',
	'linkedIn',
	'twitter',
	'googlePlus',
	'instagram',
];

export default class Social extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
	};

	render() {
		let { entity = {} } = this.props;
		let items = socialPropNames
			.map(prop => {
				return entity[prop] ? (
					<li key={prop}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							className={cx('social', prop.toLowerCase())}
							href={entity[prop]}
						>
							<span>{t(prop)}</span>
						</a>
					</li>
				) : null;
			})
			.filter(x => x);

		return items.length > 0 && <ul className="social-links">{items}</ul>;
	}
}
