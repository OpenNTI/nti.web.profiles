import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Button } from '@nti/web-core';
import { getAppUsername } from '@nti/web-client';
import { User, Text } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.activity.components.channel-stream-header.NewPost',
	{
		placeholder: 'Write something...',
		locked: 'Only facilitators can post to this forum.',
	}
);

NewPost.propTypes = {
	channel: PropTypes.shape({
		canAddDiscussion: PropTypes.bool,
	}),
};
export default function NewPost({ channel }) {
	const locked = !channel || !channel.canAddDiscussion;

	return !channel ? (
		<div />
	) : locked ? (
		<div className={cx('new-post')}>
			<div className={cx('new-post-inner')}>
				<div className={cx('avatar-square')}>
					<i className="icon-lock" />
				</div>
				<Text.Base className={cx('locked')}>{t('locked')}</Text.Base>
			</div>
		</div>
	) : (
		<Button
			as={LinkTo.Object}
			plain
			object={{ isTopic: true, isNewTopic: true }}
			className={cx('new-post')}
			title={t('placeholder')}
		>
			<div className={cx('new-post-inner')}>
				<User.Avatar className={cx('avatar')} user={getAppUsername()} />
				<Text.Base className={cx('placeholder')}>
					{t('placeholder')}
				</Text.Base>
			</div>
		</Button>
	);
}
