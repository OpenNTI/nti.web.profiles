import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Input}  from '@nti/web-commons';

import Registry from '../Registry';
import Label from '../../common/Label';

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


function handles (field) {
	return field.schema.name === 'education';
}

export default
@Registry.register(handles)
class EducationField extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		field: PropTypes.object,
		value: PropTypes.array,
		onChange: PropTypes.func
	}

	state = {}

	componentDidMount () {
		this.loadForEntity(this.props);
		this.setupFor(this.props);
	}

	componentDidUpdate (prevProps) {
		const {entity: oldEntity, value: oldValue} = prevProps;
		const {entity: newEntity, value: newValue} = this.props;

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
		const education = value && value[0];

		this.setState({
			school: education && education.school,
			graduationDate: education && new Date(education['expected_graduation'] * 1000)
		});
	}


	onChange () {
		const {onChange, field, value:oldValue} = this.props;
		const {school, graduationDate} = this.state;
		const value = !school || !graduationDate ?
			oldValue :
			[{
				MimeType: 'application/vnd.nextthought.profile.educationalexperience',
				school,
				'expected_graduation': graduationDate.getTime() / 1000
			}];

		if (onChange && oldValue !== value) {
			onChange(field, value);
		}
	}


	onGraduationDateChange = (date) => {
		const {graduationDate} = this.state;

		if (graduationDate !== date) {
			this.setState({
				graduationDate: date
			}, () => this.onChange());
		}
	}


	onSchoolChange = (school) => {
		const {school:prevSchool} = this.state;

		if (prevSchool !== school) {
			this.setState({
				school
			}, () => this.onChange());
		}
	}


	render () {
		return (
			<div className="profile-update-education-field">
				{this.renderGraduationDate()}
				{this.renderSchool()}
			</div>
		);
	}


	renderGraduationDate () {
		const {graduationDate} = this.state;

		return (
			<Label label={t('education.graduationDate.label')} className="education-graduation-date-field">
				<Input.Date value={graduationDate} onChange={this.onGraduationDateChange} precision={Input.Date.Precision.month} />
			</Label>
		);
	}


	renderSchool () {
		const {schools, school} = this.state;

		return (
			<Label label={t('education.school.label')} className="education-school-field">
				<Input.Select value={school} onChange={this.onSchoolChange} placeholder={t('education.school.placeholder')} searchable>
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
