import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Store from '../Store';

import Styles from './Style.css';

const LineBreakRegex = /\r?\n|\r$/;

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.about', {
	label: 'Description',
	placeholder: 'Community Description...'
});

export default
@Store.monitor({about: 'value', setAbout: 'onChange', aboutError: 'error'})
class AboutInput extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.any
	}


	onChange = (value) => {
		const {onChange} = this.props;

		if (onChange) {
			onChange(value.replace(LineBreakRegex, ''));
		}
	}


	render () {
		const {value, error} = this.props;

		return (
			<Input.Label className={cx('label')} label={t('label')} error={error}>
				<Input.TextArea
					className={cx('input', 'textarea')}
					value={value}
					onChange={this.onChange}
					autoGrow
				/>
			</Input.Label>
		);
	}
}