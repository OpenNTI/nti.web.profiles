import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text, FillToBottom, List } from '@nti/web-commons';
import { LinkTo, getHistory } from '@nti/web-routing';

import { getFirstChannel } from '../utils';

import Styles from './ChannelNotFound.css';
import Card from './Card';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.view.activity.component.ChannelNotFound',
	{
		header: "Sorry, this page doesn't exist...",
		description:
			'Your link may contain errors or this page may no longer exist',
		options: {
			back: 'Previous Page',
		},
	}
);

const goBack = () => getHistory().goBack();

ChannelNotFound.propTypes = {
	channels: PropTypes.any,
};
export default function ChannelNotFound({ channels }) {
	const firstChannel = getFirstChannel(channels);

	return (
		<Card className={cx('channel-not-found')}>
			<FillToBottom>
				<div className={cx('not-found')}>
					<i className={cx('icon-alert', 'icon')} />
					<div className={cx('message')}>
						<Text.Base className={cx('header')}>
							{t('header')}
						</Text.Base>
						<Text.Base className={cx('description')}>
							{t('description')}
						</Text.Base>
						<List.SeparatedInline className={cx('options')}>
							<a href="#" onClick={goBack}>
								{t('options.back')}
							</a>
							{firstChannel && (
								<LinkTo.Object object={firstChannel}>
									<Text.Base>{firstChannel.title}</Text.Base>
								</LinkTo.Object>
							)}
						</List.SeparatedInline>
					</div>
				</div>
			</FillToBottom>
		</Card>
	);
}
