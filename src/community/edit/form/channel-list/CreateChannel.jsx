import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import Styles from './Style.css';
import Store from './Store';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.edit.form.channel-list.CreateChannel',
	{
		createChannel: 'Create a New Channel',
	}
);

class CreateChannel extends React.Component {
	static propTypes = {
		canCreateChannel: PropTypes.bool,
		createChannel: PropTypes.func,
	};

	buttonRef = React.createRef();

	createChannel = () => {
		const { createChannel } = this.props;

		if (createChannel) {
			createChannel();

			setTimeout(() => {
				this.buttonRef.current?.scrollIntoView?.();
			}, 0);
		}
	};

	render() {
		const { canCreateChannel } = this.props;

		if (!canCreateChannel) {
			return null;
		}

		return (
			<span
				role="button"
				ref={this.buttonRef}
				className={cx('create-channel')}
				onClick={this.createChannel}
			>
				<i className={cx('icon-add', 'create-icon')} />
				<Text.Base className={cx('create-label')}>
					{t('createChannel')}
				</Text.Base>
			</span>
		);
	}
}

export default decorate(CreateChannel, [
	Store.monitor(['canCreateChannel', 'createChannel']),
]);
