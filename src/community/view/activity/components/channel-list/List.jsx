import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Text } from '@nti/web-commons';

import Styles from './Styles.css';
import Item from './Item';

const cx = classnames.bind(Styles);

ChannelList.propTypes = {
	list: PropTypes.shape({
		label: PropTypes.string,
		channels: PropTypes.array,
	}).isRequired,
	activeChannel: PropTypes.object,
};
export default function ChannelList({ list, activeChannel }) {
	const { label, channels } = list;
	const activeId = activeChannel && activeChannel.getID();

	return (
		<div className={cx('channel-list', { 'has-label': !!label })}>
			{label && (
				<Text.Base as="div" className={cx('channel-header')}>
					{label}
				</Text.Base>
			)}
			<ul>
				{channels.map(channel => {
					return (
						<li key={channel.getID()}>
							<Item
								channel={channel}
								active={activeId === channel.getID()}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
