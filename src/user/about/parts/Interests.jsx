import './Interests.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import { Card } from '../../../common';
import { LOCALE_PATHS } from '../../constants';

const t = scoped(LOCALE_PATHS.INTERESTS, {
	title: 'Interests',
});

export default class About extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	render() {
		const {
			user: { interests },
		} = this.props;

		return (
			<Card className="interests">
				<h2 className="title">{t('title')}</h2>
				<ul className="entries">
					{(interests || []).map(item => (
						<li className="interest" key={item}>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</Card>
		);
	}
}
