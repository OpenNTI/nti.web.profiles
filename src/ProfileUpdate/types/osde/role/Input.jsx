import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Label from '../../../common/Label';

const t = scoped('nti-web-profiles.profile-update.fields', {
	role: {
		label: 'Which best describes you?',
		placeholder: 'Select a role',
	},
});

export default class RoleField extends React.Component {
	static propTypes = {
		field: PropTypes.object.isRequired,
		value: PropTypes.string,
		index: PropTypes.number,
		onChange: PropTypes.func,
	};

	onChange = value => {
		const { field, onChange } = this.props;

		if (onChange) {
			onChange(field, value);
		}
	};

	render() {
		const { field, index, value } = this.props;
		const { schema } = field;

		//TODO: handle the case there the role is not a choice
		if (schema.type !== 'Choice') {
			return null;
		}

		return (
			<Label label={t('role.label')} index={index}>
				<Input.Select
					onChange={this.onChange}
					value={value}
					placeholder={t('role.placeholder')}
				>
					{schema.choices.map((choice, choiceIndex) => {
						return (
							<Input.Select.Option
								value={choice}
								key={choiceIndex}
							>
								{choice}
							</Input.Select.Option>
						);
					})}
				</Input.Select>
			</Label>
		);
	}
}
