import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { scoped } from '@nti/lib-locale';

import { Card } from '../../../common';
import { LOCALE_PATHS } from '../../constants';

import Experience from './ExperienceItem';

const t = scoped(LOCALE_PATHS.EDUCATION, {
	title: 'Education',
});

const fieldNames = ['school', 'degree'];

export default class About extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	render() {
		const {
			user: { education = [] },
		} = this.props;

		return (
			<Card
				className={cx('education', { empty: education.length === 0 })}
			>
				<h2 className="title">{t('title')}</h2>
				<div className="entries">
					{education.map((item, i) => (
						<Experience
							key={i}
							item={item}
							fieldNames={fieldNames}
						/>
					))}
				</div>
			</Card>
		);
	}
}

// Class: "EducationalExperience"
// MimeType: "application/vnd.nextthought.profile.educationalexperience"
// NTIID: "tag:nextthought.com,2011-10:system-OID-0x0d2413:5573657273"
// OID: "tag:nextthought.com,2011-10:system-OID-0x0d2413:5573657273"
// degree: "BS in BS"
// description: "Imaginary University education description."
// endYear: 2014
// expected_graduation: null
// school: "Imaginary University"
// startYear: 2010
