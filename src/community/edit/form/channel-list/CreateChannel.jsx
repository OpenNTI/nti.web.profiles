import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channel-list.CreateChannel', {
	createChannel: 'Create a New Channel'	
});

export default
@Store.monitor(['canCreateChannel', 'createChannel'])
class CreateChannel extends React.Component {
	static propTypes = {
		canCreateChannel: PropTypes.bool,
		createChannel: PropTypes.func
	}

	render () {
		const {canCreateChannel, createChannel} = this.props;

		if (!canCreateChannel) { return null; }

		return (
			<button type="button" className={cx('create-channel')} onClick={createChannel}>
				<i className={cx('icon-add', 'create-icon')} />
				<Text.Base className={cx('create-label')}>
					{t('createChannel')}
				</Text.Base>
			</button>
		);
	}
}