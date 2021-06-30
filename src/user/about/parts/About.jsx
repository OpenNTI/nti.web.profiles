import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

import { Card, EditorContent } from '../../../common';
import { LOCALE_PATHS } from '../../constants';

import LabelValueList from './LabelValueList';

const t = scoped(LOCALE_PATHS.ABOUT, {
	title: 'About',
	editLabel: 'Tell us about yourself…',

	tpsEmployeeId: 'TPS Employee ID',
});

const Additional = [
	user => {
		if (!user['tps_employee_id']) {
			return null;
		}

		return { label: t('tpsEmployeeId'), value: user['tps_employee_id'] };
	},
];

export default class About extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	render() {
		const { user } = this.props;
		const { about } = user ?? {};

		const additional = Additional.map(a => a(user)).filter(Boolean);

		return (
			<Card className="about" title={t('title')}>
				{about && (
					<div className="about">
						<EditorContent content={about} />
					</div>
				)}
				<LabelValueList values={additional} />
			</Card>
		);
	}
}
