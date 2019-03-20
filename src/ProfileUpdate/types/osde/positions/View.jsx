import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Input}  from '@nti/web-commons';

import Registry from '../Registry';
import Label from '../../../common/Label';

import Value from './Value';

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
		value: PropTypes.object,
		field: PropTypes.object,
		entity: PropTypes.object,
		onChange: PropTypes.func
	}

	state = {}


	componentWillUnmount () {
		this.setState = () => {};
	}

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

		if (value instanceof Value) {
			this.setState({
				title: value.title
			});
		//if we get a value that isn't an instance of a PositionsValue we need to remove it
		} else if (value) {
			this.onChange(null);
		}
	}


	onChange (value) {
		const {onChange, field, value:oldValue} = this.props;

		if (onChange && (!oldValue || !oldValue.isEqualTo(value))) {
			onChange(field, value);
		}
	}


	onCompanyChange = (companyName) => {
		const {value} = this.props;

		if (value) {
			this.onChange(value.setCompanyName(companyName));
		} else {
			this.onChange(new Value(companyName, null));
		}
	}


	onTitleChange = (title) => {
		this.setState({title});

		clearTimeout(this.titleChangeTimeout);

		this.titleChangeTimeout = setTimeout(() => {
			const {value} = this.props;

			if (value) {
				this.onChange(value.setTitle(title));
			} else {
				this.onChange(new Value(null, title));
			}
		}, 500);
	}


	render () {
		const {value} = this.props;

		return (
			<div className="profile-update-positions-field">
				{this.renderCompanyName(value)}
				{this.renderTitle(value)}
			</div>
		);
	}


	renderCompanyName (value) {
		const {schools} = this.state;

		return (
			<Label label={t('positions.companyName.label')}>
				<Input.Select
					value={value && value.companyName}
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
