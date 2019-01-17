import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Registry from '../Registry';
import Label from '../../../common/Label';

import Value from './Value';

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
		value: PropTypes.object,
		onChange: PropTypes.func
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

		if (value instanceof Value) {
			this.setState({companyName: value.companyName});
		} else if (value) {
			this.onChange(null);
		}
	}


	onChange (value) {
		const {field, onChange, value:oldValue} = this.props;

		if (onChange && (!oldValue || !oldValue.isEqualTo(value))) {
			onChange(field, value);
		}
	}


	onCompanyNameChange = (companyName) => {
		this.setState({companyName});

		clearTimeout(this.onChangeTimeout);

		this.onChangeTimeout = setTimeout(() => {
			const {value} = this.props;

			if (value) {
				this.onChange(value.setCompanyName(companyName));
			} else {
				this.onChange(new Value(companyName));
			}

		}, 500);
	}


	render () {
		const {companyName} = this.state;

		return (
			<Label label={t('companyName.label')}>
				<Input.Text value={companyName} onChange={this.onCompanyNameChange} placeholder={t('companyName.placeholder')} />
			</Label>
		);
	}
}
