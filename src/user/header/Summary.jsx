import './Summary.scss';
import cx from 'classnames';

import { Array as ArrayUtils } from '@nti/lib-commons';
import { DisplayName, User } from '@nti/web-commons';

export default function Summary({ className, entity }) {
	if (!entity) {
		return null;
	}

	const { positions, role, education: ed, location } = entity;
	const homePage = entity.home_page;
	const position = ArrayUtils.ensure(positions)[0];
	const education = ArrayUtils.ensure(ed)[0];

	return (
		<div
			className={cx('profile-head-summary', className, {
				'has-role': role,
			})}
		>
			{role && <div className="entity-role">{role}</div>}
			<div className="username-wrapper">
				<DisplayName entity={entity} />
				<User.Presence user={entity} />
			</div>
			<ul className="profile-head-summary-attrs">
				{education && (
					<li className="education">
						{[education.degree, education.school]
							.filter(x => x)
							.join(' at ')}
					</li>
				)}

				{position && (
					<li className="affiliation">
						{[position.title, position.companyName]
							.filter(Boolean)
							.join(' at ')}
					</li>
				)}

				{(location || homePage) && (
					<li className="location">
						{location && (
							<span className="location">{location}</span>
						)}
						{homePage && (
							<a
								className="home-page"
								href={homePage}
								target="_blank"
								rel="noopener noreferrer"
							>
								{homePage}
							</a>
						)}
					</li>
				)}
			</ul>
		</div>
	);
}
