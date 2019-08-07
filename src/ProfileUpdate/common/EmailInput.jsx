import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

const t = scoped('nti-profiles.ProfileUpdate.common.EmailInput', {
	description: 'Please provide an email.'
});


export default class ProfileUpdateEmailInput extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				name: PropTypes.string,
				description: PropTypes.string,
				title: PropTypes.string,
				choices: PropTypes.array
			}),
			error: PropTypes.shape({
				message: PropTypes.string
			})
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func
	}

	state = {}

	componentDidMount () {
		this.setupFor(this.props);
	}


	componentDidUpdate (prevProps) {
		const {value} = this.props;
		const {value:oldValue} = prevProps;

		if (oldValue !== value) {
			this.setupFor(this.props);
		}
	}


	setupFor (props) {
		const {value} = props;

		this.setState({value});
	}


	onChange = (value) => {
		value = value || null;

		this.setState({
			value
		});

		clearTimeout(this.onChangeTimeout);

		this.onChangeTimeout = setTimeout(() => {
			const {onChange, field, value:oldValue} = this.props;
			const {value: newValue} = this.state;

			if (onChange && oldValue !== newValue) {
				onChange(field, newValue);
			}
		}, 500);
	}

	render () {
		const {field: {schema, error: {message}}} = this.props;
		const {value} = this.state;

		return (
			<div className={cx('profile-update-sallt-profile-email-input', schema.name)}>
				<Input.Label label={t('description')}>
					<Input.Email placeholder={schema.title} value={value} onChange={this.onChange} />
				</Input.Label>
				{message && (<div className="profile-update-warning">{message}</div>)}
			</div>
		);
	}

}