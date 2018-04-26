import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Input}  from '@nti/web-commons';

import Registry from '../Registry';
import Label from '../../common/Label';

const t = scoped('nti-web-profiles.profile-update.fields', {
	positions: {
		companyName: {
			label: 'Where do you teach?',
			placeholder: 'Select a school'
		},
		title: {
			label: 'What is your job title?',
			placeholder: 'Title'
		}
	}
});

function handles (field, values) {
	return field.schema.name === 'positions' && values && values.role !== 'Educator/Community Member';
}

export default
@Registry.register(handles)
class ProfileUpdatePositionField extends React.Component {
	static propTypes = {
		value: PropTypes.array,
		field: PropTypes.object,
		entity: PropTypes.object,
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
				schools: schools.Items.map((option, index) => {
					return (
						<Input.Select.Option value={option} key={index}>
							{option}
						</Input.Select.Option>
					);
				})
			});
		} catch (e) {
			//For no do nothing, just don't show the school drop down
		}
	}


	setupFor (props) {
		const {value} = props;
		const position = value && value[0];

		if (position) {
			this.setState({
				companyName: position && position.companyName,
				title: position && position.title
			});
		}

	}


	onChange () {
		const {onChange, field, value: oldValue} = this.props;
		const {companyName, title} = this.state;
		const value = !companyName || !title ?
			null :
			[{
				MimeType: 'application/vnd.nextthought.profile.professionalposition',
				companyName,
				title
			}];

		if (onChange && value !== oldValue) {
			onChange(field, value);
		}
	}


	onCompanyChange = (companyName) => {
		if (this.state.companyName !== companyName) {
			this.setState({
				companyName
			}, () => this.onChange());
		}
	}


	onTitleChange = (title) => {
		if (this.state.title !== title) {
			this.setState({
				title
			}, () => {
				clearTimeout(this.titleChangeTimeout);

				this.titleChangeTimeout = setTimeout(() => {
					this.onChange();
				}, 500);
			});
		}

	}


	render () {
		return (
			<div className="profile-update-positions-field">
				{this.renderCompanyName()}
				{this.renderTitle()}
			</div>
		);
	}


	renderCompanyName () {
		const {schools, companyName} = this.state;

		return (
			<Label label={t('positions.companyName.label')}>
				<Input.Select
					value={companyName}
					onChange={this.onCompanyChange}
					placeholder={t('positions.companyName.placeholder')}
					searchable
				>
					{schools}
				</Input.Select>
			</Label>
		);
	}


	renderTitle () {
		const {title} = this.state;

		return (
			<Label label={t('positions.title.label')}>
				<Input.Text value={title} onChange={this.onTitleChange} placeholder={t('positions.title.placeholder')} />
			</Label>
		);
	}
}
