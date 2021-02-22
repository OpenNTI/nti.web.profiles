import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Input } from '@nti/web-commons';

export default class ProfileUpdateListInput extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				description: PropTypes.string,
				name: PropTypes.string,
				title: PropTypes.string,
				value_type: PropTypes.object, //eslint-disable-line
			}),
		}),
		value: PropTypes.any,
		onChange: PropTypes.func,
	};

	onChange = value => {
		const { field, onChange } = this.props;

		if (onChange) {
			onChange(field, value);
		}
	};

	render() {
		const {
			field: { schema },
			value,
		} = this.props;

		return (
			<div className={cx('profile-update-list-input', schema.name)}>
				<Input.Label label={schema.description}>
					{this.renderInput(schema['value_type'], value)}
				</Input.Label>
			</div>
		);
	}

	renderInput(type, value) {
		if (type.type === 'Choice') {
			return this.renderChoices(type, value);
		}
	}

	renderChoices(type, value) {
		return (
			<Input.MultiSelect
				values={value}
				placeholder={type.title}
				optionsClassName="profile-update-multi-select-list"
				onChange={this.onChange}
			>
				{type.choices.map((choice, key) => {
					return (
						<Input.MultiSelect.Option value={choice} key={key}>
							{choice}
						</Input.MultiSelect.Option>
					);
				})}
			</Input.MultiSelect>
		);
	}
}
