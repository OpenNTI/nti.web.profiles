import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profile.community.edit.form.channel.Description', {
	placeholder: 'Write a description (optional)'
});

export default
@Store.monitor({description: 'value', 'setDescription': 'onChange', descriptionError: 'error', readOnly: 'readOnly'})
class DescriptionInput extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.any,
		readOnly: PropTypes.bool
	}

	render () {
		const {value, onChange, error, readOnly} = this.props;

		return (
			<Input.Label error={error}>
				<Input.Text
					className={cx('input', 'description')}
					value={value}
					onChange={onChange}
					placeholder={!readOnly && t('placeholder')}
					readOnly={readOnly}
				/>
			</Input.Label>
		);
	}
}