import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import { Card, EditorContent } from '../../../common';
import { LOCALE_PATHS } from '../../constants';

const t = scoped(LOCALE_PATHS.ABOUT, {
	title: 'About',
	editLabel: 'Tell us about yourself…',
});

export default class About extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	render() {
		const {
			user: { about = [] },
		} = this.props;

		return (
			<Card className="about" title={t('title')}>
				{about && (
					<div className="about">
						<EditorContent content={about} />
					</div>
				)}
			</Card>
		);
	}
}
