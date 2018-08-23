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
			item: {startYear, endYear, description} = {},
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
				{ position && <div className="position">{position}</div> }
				{ startYear && <div className="start-year">{startYear}</div> }
				{ endYear && <div className="end-year">{endYear}</div> }
				{ description && <div className="description">{description}</div> }
			</div>
		);
	}
}
