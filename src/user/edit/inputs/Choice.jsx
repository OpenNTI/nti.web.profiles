import './Choice.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@nti/web-commons';
import cx from 'classnames';

const {
	Select,
	Select: { Option },
} = Input;

export default class ChoiceInput extends React.PureComponent {
	static handles = ({ type }) => type === 'Choice';
	static shouldHide({ schema }) {
		return !schema.choices || schema.choices.length === 0;
	}

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		schema: PropTypes.object,
		onChange: PropTypes.func,
		onInvalid: PropTypes.func,
	};

	render() {
		const {
			className,
			schema: { readonly, choices = [] } = {},
			...props
		} = this.props;

		return (
			<Select
				className={cx('nti-profile-choice-input', className)}
				{...props}
				optionsClassName="nti-profile-choice-input-option-list"
				disabled={readonly}
			>
				{choices.map((v, i) => (
					<Option key={i} value={v}>
						{v}
					</Option>
				))}
			</Select>
		);
	}
}
