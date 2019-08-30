import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channel.title', {
	placeholder: 'Channel Title...'
});

export default
@Store.monitor({title: 'value', 'setTitle': 'onChange', 'titleError': 'error', readOnly: 'readOnly'})
class TitleInput extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.any,
		autoFocus: PropTypes.bool,
		readOnly: PropTypes.bool
	}

	render () {
		const {value, onChange, error, autoFocus, readOnly} = this.props;

		return (
			<Input.Label className={cx('title-input')} error={error}>
				<Input.Text
					autoFocus={autoFocus}
					className={cx('input', 'title')}
					value={value}
					onChange={onChange}
					placeholder={!readOnly && t('placeholder')}
					readOnly={readOnly}
				/>
			</Input.Label>
		);
	}
}
