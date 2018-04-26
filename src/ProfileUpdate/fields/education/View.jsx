import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Input}  from '@nti/web-commons';

import Registry from '../Registry';
import Label from '../../common/Label';

import Value from './Value';

const t = scoped('nti-web-profiles.profile-update.fields', {
	education: {
		graduationDate: {
			label: 'When do you expect to graduate?'
		},
		school: {
			label: 'Where do you attend school?',
			placeholder: 'Select a school'
		}
	}
});

const MIN_DATE = new Date('January 1, 2000');
const MAX_DATE = new Date('December 31, 3000');


function handles (field) {
	return field.schema.name === 'education';
}

export default
@Registry.register(handles)
class EducationField extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		field: PropTypes.object,
		value: PropTypes.object,
		onChange: PropTypes.func
	}

	state = {}

	componentDidMount () {
		this.loadForEntity(this.props);
		this.setupFor(this.props);
	}

	componentDidUpdate (prevProps) {
		const {entity: oldEntity, value:oldValue} = prevProps;
		const {entity: newEntity, value:newValue} = this.props;

		if (oldEntity !== newEntity) {
			this.loadForEntity(this.props);
		}

		if (oldValue !== newValue) {
			this.setupFor(this.props);
		}
	}


	async loadForEntity (props) {
		const {entity} = props;

		try {
			const schools = await entity.fetchLink('SchoolsAndDistricts');

			this.setState({
				schools: schools.Items
			});
		} catch (e) {
			//For now do nothing, just don't show the school drop down
		}
	}


	setupFor (props) {
		const {value} = props;

		if (value && value instanceof Value) {
			this.setState({
				graduationDate: value.graduateionDate
			});
		}
	}


	onChange (value) {
		const {onChange, field, value:oldValue} = this.props;

		if (onChange && (!oldValue || !oldValue.isEqualTo(value))) {
			onChange(field, value);
		}
	}


	onSchoolChange = (school) => {
		const {value} = this.props;

		if (value) {
			this.onChange(value.setSchool(school));
		} else {
			this.onChange(new Value(school, null));
		}
	}


	onGraduationDateChange = (graduationDate) => {
		this.setState({graduationDate});

		clearTimeout(this.graduationDateChangeTimeout);

		this.graduationDateChangeTimeout = setTimeout(() => {
			debugger;
			const {value} = this.props;

			if (value) {
				this.onChange(value.setGraduationDate(graduationDate));
			} else {
				this.onChange(new Value(null, graduationDate));
			}
		}, 500);

	}


	render () {
		const {value} = this.props;

		return (
			<div className="profile-update-education-field">
				{this.renderGraduationDate(value)}
				{this.renderSchool(value)}
			</div>
		);
	}


	renderGraduationDate () {
		const {graduationDate} = this.state;

		return (
			<Label label={t('education.graduationDate.label')} className="education-graduation-date-field">
				<Input.Date
					value={graduationDate}
					onChange={this.onGraduationDateChange}
					precision={Input.Date.Precision.month}
					min={MIN_DATE}
					max={MAX_DATE}
				/>
			</Label>
		);
	}


	renderSchool (value) {
		const {schools} = this.state;

		return (
			<Label label={t('education.school.label')} className="education-school-field">
				<Input.Select
					value={value && value.school}
					onChange={this.onSchoolChange}
					placeholder={t('education.school.placeholder')}
					searchable
				>
					{(schools || []).map((option, index) => {
						return (
							<Input.Select.Option value={option} key={index}>
								{option}
							</Input.Select.Option>
						);
					})}
				</Input.Select>
			</Label>
		);
	}
}
