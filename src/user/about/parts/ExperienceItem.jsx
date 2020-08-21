import './ExperienceItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class ExperienceItem extends React.Component {

	static propTypes = {
		className: PropTypes.string,
		item: PropTypes.object,
		fieldNames: PropTypes.array // [school or company field name, degree or position field name]
	}

	render () {
		const {
			className,
			item,
			item: {description} = {},
			fieldNames: [companyField, positionField] = ['companyName', 'title']
		} = this.props;

		if (!item) {
			return null;
		}

		const company = item[companyField];
		const position = item[positionField];

		return (
			<div className={cx('profile-experience-item', className)}>
				<div className="organization">{company}</div>
				<div className="details">
					{ position && <div className="position">{position}</div> }
					<Years item={item} />
				</div>
				{ description && <div className="description">{description}</div> }
			</div>
		);
	}
}

Years.propTypes = {
	item: PropTypes.object.isRequired
};

function Years ({item: {startYear, endYear} = {}}) {
	return (!startYear && !endYear) ? null : (
		<div className="years">
			{ startYear && <span className="year start">{startYear}</span> }
			{ startYear && endYear && <span> – </span> }
			{ endYear && <span className="year end">{endYear}</span> }
		</div>
	);
}
