import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Registry from '../Registry';
import Label from '../../common/Label';

const t = scoped('nti-web-profiles.profile-update.fields', {
	companyName: {
		label: 'What company are you with? (if applicable)',
		placeholder: 'Company Name'
	}
});

function handles (field, values) {
	return field.schema.name === 'positions' && values && values.role === 'Employer/Community Member';
}

export default
@Registry.register(handles)
class ProfileUpdateCompanyNameField extends React.Component {
	static propTypes = {
		field: PropTypes.object,
		value: PropTypes.array,
		onChange: PropTypes.string
	}

	state = {}

	componentDidMount () {
		this.setupFor(this.props);
	}

	componentDidUpdate (prevProps) {
		const {value: oldValue} = prevProps;
		const {value: newValue} = this.props;

		if (oldValue !== newValue) {
			this.setupFor(this.props);
		}
	}

	setupFor (props) {
		const {value} = props;
		const position = value && value[0];

		this.setState({
			value: position && position.companyName
		});
	}


	onChange = (value) => {
		this.setState({value});

		clearTimeout(this.onChangeTimeout);

		this.onChangeTimeout = setTimeout(() => {
			const {field, onChange, value:oldValue} = this.props;

			if (onChange && oldValue !== value) {
				onChange(field, [{
					MimeType: 'application/vnd.nextthought.profile.professionalposition',
					companyName: value
				}]);
			}
		}, 500);
	}


	render () {
		const {value} = this.state;

		return (
			<Label label={t('companyName.label')}>
				<Input.Text value={value} onChange={this.onChange} placeholder={t('companyName.placeholder')} />
			</Label>
		);
	}
}
