import './Boolean.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

const {Select, Select: {Option}} = Input;

const t = scoped('nti-profiles.user.edit.inputs.Boolean', {
	yes: 'Yes',
	no: 'No'
});

export default class BooleanInput extends React.PureComponent {
	static handles = ({type}) => type === 'bool'

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		value: PropTypes.bool,
		schema: PropTypes.object,
		onChange: PropTypes.func,
		onInvalid: PropTypes.func
	}


	onChange = (value) => {
		const {onChange} = this.props;

		if (onChange) {
			onChange(value === 'true');
		}
	}


	render () {
		const {className, value, schema: {readOnly} = {}, ...props} = this.props;


		return (
			<Select
				className={cx('nti-profile-boolean-input', className)}
				{...props}
				onChance={this.onChange}
				disabled={readOnly}
				onChange={this.onChange}
				value={value == null ? value : (value ? 'true' : 'false')}
			>
				<Option key="yes" value="true">{t('yes')}</Option>
				<Option key="no" value="false">{t('no')}</Option>
			</Select>
		);
	}
}
