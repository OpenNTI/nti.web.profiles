import React from 'react';
import PropTypes from 'prop-types';
import {Array as ArrayUtils} from '@nti/lib-commons';
import {DisplayName} from '@nti/web-commons';

export default class Summary extends React.Component {
	static propTypes = {
		entity: PropTypes.object
	}

	render () {
		const {entity} = this.props;

		if (!entity) {
			return null;
		}

		let {positions, education, location} = entity;
		let homePage = entity.home_page;
		let position = ArrayUtils.ensure(positions)[0];
		education = ArrayUtils.ensure(education)[0];

		return (
			<div className="profile-head-summary">
				<DisplayName entity={entity} />
				<ul className="profile-head-summary-attrs">
					{education && (
						<li className="education">
							{[education.degree, education.school].filter(x=>x).join(' at ')}
						</li>
					)}

					{position && (
						<li className="affiliation">
							{[position.title, position.companyName].join(' at ')}
						</li>
					)}

					{ (location || homePage) && (
						<li className="location">
							{location && ( <span className="location">{location}</span> )}
							{homePage && ( <a className="home-page" href={homePage} target="_blank" rel="noopener noreferrer">{homePage}</a> )}
						</li>
					)}
				</ul>
			</div>
		);
	}
}
