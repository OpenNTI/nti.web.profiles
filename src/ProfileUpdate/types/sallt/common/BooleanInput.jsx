import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

const {Select, Select: {Option}} = Input;

const t = scoped('nti-profiles.ProfileUpdate.types.sallt.common.BooleanInput', {
	yes: 'Yes',
	no: 'No'
});

export default class SalltProfileChoiceInput extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				description: PropTypes.string,
				title: PropTypes.string,
				choices: PropTypes.array
			})
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func
	}


	onChange = (value) => {
		const {field, onChange} = this.props;

		if (onChange) {
			onChange(field, value === 'true');
		}
	}


	render () {
		const {field: {schema}, value} = this.props;

		return (
			<div className={cx('profile-update-sallt-profile-boolean-input', schema.name)}>
				<Input.Label label={schema.description}>
					<Select
						value={value == null ? value : (value ? 'true' : 'false')}
						placeholder={schema.title}
						onChange={this.onChange}
					>
						<Option value="true">{t('yes')}</Option>
						<Option value="false">{t('no')}</Option>
					</Select>
				</Input.Label>
			</div>
		);
	}
}
