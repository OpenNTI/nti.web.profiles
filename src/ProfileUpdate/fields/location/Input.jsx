import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Registry from '../Registry';
import Label from '../../common/Label';

const t = scoped('nti-web-profiles.profile-update.fields', {
	location: {
		label: 'Where are you from?',
		placeholder: 'City / Town'
	}
});

function handles (item) {
	return item.schema.name === 'location';
}

export default
@Registry.register(handles)
class ProfileUpdateLocationField extends React.Component {
	static propTypes = {
		field: PropTypes.object,
		value: PropTypes.string,
		onChange: PropTypes.func
	}

	state = {}

	componentDidMount () {
		this.setupFor(this.props);
	}

	componentDidUpdate (prevProps) {
		const {value:oldValue} = prevProps;
		const {value: newValue} = this.props;

		if (oldValue !== newValue) {
			this.setupFor(this.props);
		}
	}


	setupFor (props) {
		const {value} = props;

		this.setState({value: value});
	}


	onChange = (value) => {

		this.setState({
			value
		});

		clearTimeout(this.onChangeTimeout);

		this.onChangeTimeout = setTimeout(() => {
			const {onChange, field, value:oldValue} = this.props;

			if (onChange && oldValue !== value) {
				onChange(field, value);
			}
		}, 500);
	}


	render () {
		const {value} = this.state;

		return (
			<Label label={t('location.label')} >
				<Input.Text placeholder={t('location.placeholder')} value={value} onChange={this.onChange} />
			</Label>
		);
	}
}
