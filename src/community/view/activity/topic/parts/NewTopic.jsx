import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor} from '@nti/web-discussions';
import {Router, LinkTo} from '@nti/web-routing';
import {Text, Icons, StandardUI} from '@nti/web-commons';

import Styles from './NewTopic.css';

const cx = classnames.bind(Styles);

NewChannelTopic.propTypes = {
	dialog: PropTypes.bool,
	channel: PropTypes.object,
	community: PropTypes.object
};
export default function NewChannelTopic ({dialog, channel, community}) {
	const router = Router.useRouter();

	const afterSave = (newTopic) => {
		router.routeTo.object(newTopic);
	};

	const Cmp = dialog ? StandardUI.Card : 'div';

	return (
		<Cmp className={cx('new-channel-topic', {dialog})}>
			<div className={cx('header')}>
				<Text.Base className={cx('channel')}>
					{channel.title}
				</Text.Base>
				<LinkTo.Object object={channel} className={cx('close')}>
					<Icons.X />
				</LinkTo.Object>
			</div>
			<Editor
				container={[community, channel]}
				afterSave={afterSave}
			/>
		</Cmp>
	);
}