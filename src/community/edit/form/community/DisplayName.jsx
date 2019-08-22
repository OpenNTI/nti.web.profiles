import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.community.DisplayName', {
	label: 'Title',
	placeholder: 'Community Title...'
});

export default
@Store.monitor({'displayName': 'value', 'setDisplayName': 'onChange', 'displayNameError': 'error'})
class DisplayNameInput extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.any
	}

	render () {
		const {value, onChange, error} = this.props;

		return (
			<Input.Label className={cx('label')} label={t('label')} error={error}>
				<Input.Text
					className={cx('input', 'title')}
					value={value}
					onChange={onChange}
					placeholder={t('placeholder')}
				/>
			</Input.Label>
		); 
	}
}
