import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Input} from '@nti/web-commons';

const {Select, Select: {Option}} = Input;

export default class SalltProfileChoiceInput extends React.Component {
	static shouldHide (schema) { return !schema.choices || schema.choices.length === 0; }

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
			onChange(field, value);
		}
	}


	render () {
		const {field: {schema}, value} = this.props;

		return (
			<div className={cx('profile-update-sallt-profile-choice-input', schema.name)}>
				<Input.Label label={schema.description}>
					<Select
						value={value}
						placeholder={schema.title}
						optionsClassName="profile-update-select-options-list"
						onChange={this.onChange}
					>
						{schema.choices.map((choice, key) => {
							return (
								<Option value={choice} key={key}>{choice}</Option>
							);
						})}
					</Select>
				</Input.Label>
			</div>
		);
	}
}
