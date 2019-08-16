import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {getAppUsername} from '@nti/web-client';
import {User, Text} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.activity.components.channel-stream-header.NewPost', {
	placeholder: 'Write something...'
});


NewPost.propTypes = {
	channel: PropTypes.shape({
		canAddTopic: PropTypes.bool
	})
};
export default function NewPost ({channel}) {
	if (!channel || !channel.canAddTopic) { return null; }

	return (
		<div className={cx('new-post')}>
			<div className={cx('new-post-inner')}>
				<User.Avatar className={cx('avatar')} user={getAppUsername()} />
				<Text.Base className={cx('placeholder')}>{t('placeholder')}</Text.Base>
			</div>
		</div>
	);
}