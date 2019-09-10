import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input, Text, Errors} from '@nti/web-commons';

import Store from '../Store';

import Styles from './Form.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.AutoSubscribe', {
	label: 'Auto-Subscribe',
	description: 'Everyone has access to view and engage in this community.'
});

export default
@Store.monitor({autoSubscribe: 'value', setAutoSubscribe: 'onChange', autoSubscribeError: 'error'})
class AutoSubscribe extends React.Component {
	static propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func,
		error: PropTypes.any
	}

	render () {
		const {value, onChange, error} = this.props;

		return (
			<div className={cx('auto-subscribe')}>
				<div className={cx('field')}>
					<div className={cx('message')}>
						<Text.Base className={cx('label')}>{t('label')}</Text.Base>
						<Text.Base className={cx('description')}>{t('description')}</Text.Base>
					</div>
					<Input.Toggle value={value} onChange={onChange} hideLabel />
				</div>
				{error && (
					<Errors.Message error={error} />
				)}
			</div>
		);
	}
}