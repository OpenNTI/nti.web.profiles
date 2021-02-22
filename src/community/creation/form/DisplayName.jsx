import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

import Store from '../Store';

import Styles from './Form.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.creation.form.DisplayName', {
	placeholder: 'Title',
});

class DisplayNameInput extends React.Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		error: PropTypes.any,
	};

	render() {
		const { value, onChange, error } = this.props;

		return (
			<Input.Label className={cx('label')} error={error}>
				<Input.Text
					className={cx('text-input')}
					value={value}
					onChange={onChange}
					placeholder={t('placeholder')}
				/>
			</Input.Label>
		);
	}
}

export default decorate(DisplayNameInput, [
	Store.monitor({
		displayName: 'value',
		setDisplayName: 'onChange',
		displayNameError: 'error',
	}),
]);
